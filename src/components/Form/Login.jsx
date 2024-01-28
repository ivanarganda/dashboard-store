import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './../../Context/authContext';
import { MsgContext } from '../../Context/messageContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

import { googleLogout , useGoogleLogin  } from '@react-oauth/google';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestoreIcon from '@mui/icons-material/Restore';
import ChecklistIcon from '@mui/icons-material/Checklist';
import BR from './../Tools/BR';

function Login() {

  const { setSession , setHasPassword } = useContext(AuthContext);
  const { useMessage } = useContext( MsgContext ); 
  const [ logged , setLogged ] = useState( false ); 

  const handleCallbackResponse = async(response_login) => {
    // const [headerEncoded, payloadEncoded, signature] = response.access_token.split('.');
    // // Decode the header and payload
    // const header = JSON.parse(atob(headerEncoded));
    // const payload = JSON.parse(atob(payloadEncoded));
    // const { email, name , sub , picture } = payload;

    // console.log( payload );

    useMessage( `Logging.....` , 'success' , 2000 , 'top' , 'center' );

    try {

      await axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response_login.access_token}`, {
            headers: {
                Authorization: `Bearer ${response_login.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {

          console.log( res.data );

          const { name , email , id , picture } = res.data;
          axios.post('https://ws-api-tech.online/api/login/google', {
            'username': name,
            'email': email,
            'google_id': id
          }).then((response) => {

            // Set a first party cookie for GoogleOAuth
            document.cookie = `oauthToken=${response_login.access_token}; path=/; domain=https://igvtech.online; secure`;

            const { password } = response.data.data.user

            response.data.picture = picture;

            sessionStorage.setItem('auth', JSON.stringify(response.data));
            setSession(JSON.parse(sessionStorage.getItem('auth')));

            useMessage( `Logged as ${name} ... redirecting...` , 'success' , 2000 , 'top' , 'center' );
            sessionStorage.setItem('auth_pass', JSON.stringify({"password":password}) );
            setHasPassword( JSON.parse(sessionStorage.getItem('auth_pass')) );
            setLogged( true );
            setTimeout(()=>{
              window.location='/';
            },3000)

          });
                
      })

    } catch ( error ){

        useMessage( `${error} Incurred an error on loging...contact with developer` , 'error' , 2000 , 'top' , 'center' );

    }
  }

  const login = useGoogleLogin({
    onSuccess: (response) => handleCallbackResponse( response ),
  })

  return (
    <section className={`w-full flex flex-col-reverse justify-center m-auto items-center sm:mt-10 lg:flex lg:flex-row lg:justify-center items-center lg:mt-20`}>
      <article className='mt-20 mb-40 lg:mt-20 lg:w-full min-w-[350px] w-1/2 lg:ml-60 bg-gray-300 shadow-xl m-auto rounded-xl p-10'>
        <div>
          <h4 className='text-gray-700 font-bold text-2xl'>Why to log in?</h4>
        </div>
        <div>
          <p className='text-gray-500 font-bold mb-3 text-xl'>Do not miss last features, you could:</p>
          <ul>
            <li className='flex flex-row space-x-3 mt-14 items-center justify-start'>
              <CheckIcon sx={{fontSize:'40px'}} color='success'/>
              <span className='text-gray-500 font-bold'>Save products as favorites and then purchage them</span>
            </li>
            <li className='flex flex-row space-x-3 mt-6'>
              <CheckIcon sx={{fontSize:'40px'}} color='success'/>
              <span className='text-gray-500 font-bold'>Save budgets for next time if at moment you dont want to complete it</span>
            </li>
            <li className='flex flex-row space-x-3 mt-6'>
              <CheckIcon sx={{fontSize:'40px'}} color='success'/>
              <span className='text-gray-500 font-bold'>Give your feedback on each product</span>
            </li>
          </ul>
        </div>
        <div className='flex flex-row justify-center gap-20 m-auto mt-10'>
          <LocalShippingIcon sx={{fontSize:'50px'}}/>
          <RestoreIcon sx={{fontSize:'50px'}}/>
          <ChecklistIcon sx={{fontSize:'50px'}}/>
        </div>
      </article>
      <article className='lg:mt-20 sm:pl-0 m-auto lg:ml-40'>
        <h4 className='text-gray-300 text-3xl mb-3'>Log in</h4>
        <div style={{ width: '100%' }}>
        <button onClick={()=>login()}>Sign in</button>
        </div>
      </article>
      
      
      {
        logged && <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
      }

      <BR />
      
    </section>
  )
}

export default React.memo(Login);
