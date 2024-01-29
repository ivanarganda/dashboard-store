import React from 'react'
import useValidateForm from './../../Hooks/estate/useValidateForm';

export default function Login({ changeForm }) {

  const [ fields , handleFields , submitForm ] = useValidateForm();

  return (
    <form onSubmit={submitForm}>
        <input type="text" name='email' onChange={handleFields}/>
        <input type="password" name='password' onChange={handleFields}/>

        <span>Don´t you have account yet?</span><button onClick={ ( e )=>{ e.preventDefault(); changeForm('Sign up') } }>Sign up</button>
    </form>
  )
}
