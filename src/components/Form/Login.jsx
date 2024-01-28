import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './../../Context/authContext';
import { MsgContext } from '../../Context/messageContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

import { GoogleLogin  } from '@react-oauth/google';

function Login() {

  const { setSession , setHasPassword } = useContext(AuthContext);
  const { useMessage } = useContext( MsgContext ); 
  const [ logged , setLogged ] = useState( false ); 

  const handleCallbackResponse = async(response) => {
    const [headerEncoded, payloadEncoded, signature] = response.credential.split('.');
    // Decode the header and payload
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));
    const { email, name , sub , picture } = payload;

    useMessage( `Logging.....` , 'success' , 2000 , 'top' , 'center' );

    try {

      await axios.post('https://ws-api-tech.online/api/login/google', {
        'username': decodeURIComponent(escape(name)),
        'email': email,
        'google_id': sub
      }).then((response) => {

        // Set a first party cookie for GoogleOAuth
        document.cookie = `oauthToken=${response.credential}; path=/; domain=https://igvtech.online; secure`;

        const { password } = response.data.data.user

        response.data.picture = picture;

        sessionStorage.setItem('auth', JSON.stringify(response.data));
        setSession(JSON.parse(sessionStorage.getItem('auth')));

        useMessage( `Logged as ${decodeURIComponent(escape(name))} ... redirecting...` , 'success' , 2000 , 'top' , 'center' );
        sessionStorage.setItem('auth_pass', JSON.stringify({"password":password}) );
        setHasPassword( JSON.parse(sessionStorage.getItem('auth_pass')) );
        setLogged( true );
        setTimeout(()=>{
          window.location='/';
        },3000)

      });

    } catch ( error ){

        useMessage( `${error} Incurred an error on loging...contact with developer` , 'error' , 2000 , 'top' , 'center' );

    }
  }

  return (
    <section className={`flex flex-row justify-center items-start min-h-screen w-full`}>
      <article className='flex flex-col gap-4 ml-40 mb-10 mt-40 w-1/3 h-[600px] bg-gray-200 rounded p-10 shadow-xl'>
        <div>
          <h4 className='text-gray-700 font-bold text-xl'>Why to log in?</h4>
        </div>
        <div>
          <p className='text-gray-500 font-bold mb-3'>Do not miss last features, you could:</p>
          <ul>
            <li className='style- flex flex-row space-x-3 mt-6'>
              <CheckIcon color='success'/>
              <span>Save products as favorites and then purchage them</span>
            </li>
            <li className='style- flex flex-row space-x-3 mt-6'>
              <CheckIcon color='success'/>
              <span>Save budgets for next time if at moment you dont want to complete it</span>
            </li>
            <li className='style- flex flex-row space-x-3 mt-6'>
              <CheckIcon color='success'/>
              <span>Give your feedback on each product</span>
            </li>
          </ul>
        </div>
      </article>
      <article className='ml-40 mb-10 mt-40 w-2/3'>
        <h4 className='text-gray-300 text-3xl mb-3'>Log in</h4>
        <GoogleLogin
          onSuccess={handleCallbackResponse}
        />
      </article>
      
      {
        logged && <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
      }
      
    </section>
  )
}

export default React.memo(Login);
