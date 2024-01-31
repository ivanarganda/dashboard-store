import React, { useState } from 'react'
import useValidateForm from './../../Hooks/estate/useValidateForm';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login({ changeForm , styles }) {

  const [ fields , logged , securityPassword , handleFields , submitForm ] = useValidateForm();
  

  return (
    <form className={styles.form} onSubmit={(event)=>submitForm(event,'login')}>
        <div className={styles.inputLabels}>
          <label className={styles.label} htmlFor="email">Email</label> 
          <input className={styles.input} type="text" name='email' id='email' value={fields.email} onChange={handleFields}/>
        </div>
        <div className={styles.inputLabels}>
          <label className={styles.label} htmlFor='password'>Password</label>
          <input style={{appearance:'none'}} className={styles.input + securityPassword} type="password" name='password' id='password' value={fields.password} onChange={handleFields}/>
        </div>
        <div className={styles.spanLabels}>
          <span className='text-gray-100 text-md'>Don´t you have account yet?</span><span className='text-orange-300 hover:text-orange-400 cursor-pointer' onClick={ ( e )=>{ e.preventDefault(); changeForm('Sign up') } }>Sign up</span>
        </div>
        <div className={styles.buttonsLabel}>
          <button className={styles.buttonSubmit}>Sign in</button>  
        </div>
        {
        logged && <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
      }
    </form>
  )
}
