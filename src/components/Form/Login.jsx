import React , {useEffect} from 'react'
import axios from 'axios';

export default function Login({styles}) {

  const handleCallbackResponse = ( response ) =>{

    const [headerEncoded, payloadEncoded, signature] = response.credential.split('.');

    // Decode the header and payload
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));

    const { email , name , sub } = payload;

    axios.post('https://ws-api-tech.online/api/login/google' , {
      'username':decodeURIComponent(escape(name)),
      'email':email,
      'google_id':sub
    }).then((response)=>{
      console.log( response.data );
    })

  }   

  useEffect(()=>{
      // Global google
      google.accounts.id.initialize({
          client_id:'909316839836-f6ig5si1ab9qo7u8jtddt4or98rlhoju.apps.googleusercontent.com',
          callback: handleCallbackResponse
      })

      google.accounts.id.renderButton(
          document.getElementById('signInDiv'),
          { theme: 'outline' , size: 'large' }
      )

  },[])

  return (
    <section className={`${styles}`}>
      <div id='signInDiv'>
      </div>
    </section>
  )
}
