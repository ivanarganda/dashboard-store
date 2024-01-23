import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './../../Context/authContext';
import { MsgContext } from '../../Context/messageContext';

function Login({ styles }) {

  const { setSession } = useContext(AuthContext);
  const { writeMessage } = useContext( MsgContext ); 

  const handleCallbackResponse = async(response) => {
    const [headerEncoded, payloadEncoded, signature] = response.credential.split('.');
    // Decode the header and payload
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));
    const { email, name , sub } = payload;

    await axios.post('https://ws-api-tech.online/api/login/google', {
      'username': decodeURIComponent(escape(name)),
      'email': email,
      'google_id': sub
    }).then((response) => {
      sessionStorage.setItem('auth', JSON.stringify(response.data));
      setSession(JSON.parse(sessionStorage.getItem('auth')));
      writeMessage(`Loging as ${decodeURIComponent(escape(name))} .....`);
      setTimeout(()=>{
        window.location='';
      },3000)
    });
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
    </section>
  )
}

export default React.memo(Login);
