import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './../../Context/authContext';
import { MsgContext } from '../../Context/messageContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Login({ styles }) {

  const { setSession , setHasPassword } = useContext(AuthContext);
  const { useMessage } = useContext( MsgContext ); 
  const [ logged , setLogged ] = useState( false ); 

  const handleCallbackResponse = async(response) => {
    const [headerEncoded, payloadEncoded, signature] = response.credential.split('.');
    // Decode the header and payload
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));
    const { email, name , sub } = payload;

    useMessage( `Logging.....` , 'success' , 2000 , 'top' , 'center' );

    try {

      await axios.post('https://ws-api-tech.online/api/login/google', {
        'username': decodeURIComponent(escape(name)),
        'email': email,
        'google_id': sub
      }).then((response) => {

        const { password } = response.data.data.user
        sessionStorage.setItem('auth', JSON.stringify(response.data));
        setSession(JSON.parse(sessionStorage.getItem('auth')));

        useMessage( `Logged as ${decodeURIComponent(escape(name))} ... redirecting...` , 'success' , 2000 , 'top' , 'center' );
        sessionStorage.setItem('auth_pass', JSON.stringify({"password":password}) );
        setHasPassword( JSON.parse(sessionStorage.getItem('auth_pass')) );
        setLogged( true );
        setTimeout(()=>{
          window.location='';
        },3000)

      });

    } catch ( error ){

        useMessage( `${error} Incurred an error on loging...contact with developer` , 'error' , 2000 , 'top' , 'center' );

    }
  }

  useEffect(() => {
    // Global google
    google.accounts.id.initialize({
      client_id: '909316839836-f6ig5si1ab9qo7u8jtddt4or98rlhoju.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'filled', size: 'large' }
    );

  }, []);

  return (
    <section className={`${styles}`}>
      <div id='signInDiv'>
      </div>
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
