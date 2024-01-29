import React from 'react'

export default function Register({ changeForm }) {
  return (
    <form>
        Register

        <span>Do you have already account?</span><button onClick={ ( e )=>{ e.preventDefault(); changeForm('Sign in') } }>Sign in</button>
    </form>
  )
}