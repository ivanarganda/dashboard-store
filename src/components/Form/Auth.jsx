import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './../../Context/authContext';
import { MsgContext } from '../../Context/messageContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

import { useGoogleLogin  } from '@react-oauth/google';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestoreIcon from '@mui/icons-material/Restore';
import ChecklistIcon from '@mui/icons-material/Checklist';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import Login from './Login';
import Register from './Register';

function Auth() {

  const { setSession , setHasPassword } = useContext(AuthContext);
  const { useMessage } = useContext( MsgContext ); 
  const [ logged , setLogged ] = useState( false ); 
  const [ currentAuth , setCurrentAuth ] = useState('Sign in');

  const changeForm = ( form )=>{
    setCurrentAuth( form );
  }

  const getAuthForm = ( currentAuth )=>{

    const styles = {
      form:'flex w-full flex-col p-6 min-w-fit',
      inputLabels:'flex flex-col justify-center w-full min-w-fit mt-2',
      label:'flex flex-row justify-center items-start w-full m-auto text-gray-300 text-xl mb-1',
      input:'relative bg-gray-100 rounded-md p-2 outline-none',
      spanLabels:'flex flex-row w-full m-auto items-center justify-center mt-2 space-x-3',
      buttonsLabel:'flex flex-row w-full m-auto items-center justify-center mt-10 space-x-20',
      buttonSubmit:'p-2 bg-orange-400 text-gray-100 text-lg hover:bg-orange-800 active:bg-tomato transition-all w-full',
      buttonClear:'p-2 bg-orange-700 text-gray-100 text-lg hover:bg-orange-800 active:bg-tomato transition-all w-full'
    }

    const form = { 
        'Sign in':<Login changeForm={changeForm} styles={styles}/>,
        'Sign up':<Register changeForm={changeForm} styles={styles}/>
    }

    return form[ currentAuth ];

  }

  const authGoogle = async(response_login) => {
  
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
    onSuccess: (response) => authGoogle( response ),
  })

  return (
    <section className={`flex flex-col-reverse justify-center m-auto items-center sm:mt-10 lg:flex lg:flex-row lg:justify-center items-center lg:mt-40`}>
      <article className='mt-20 mb-40 lg:mt-20 lg:w-full min-w-[350px] w-ful lg:ml-60 bg-gray-300 shadow-xl m-auto rounded-xl p-10'>
        <div className='w-full'>
          <h4 className='text-gray-700 font-bold text-2xl'>Why to log in?</h4>
        </div>
        <div className='w-full flex flex-col justify-center items-start'>
          <p className='text-gray-500 font-bold -mb-5 mt-4 text-xl'>Do not miss last features, you could:</p>
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
        <div className='flex flex-row items-center justify-center gap-20 m-auto mt-10'>
          <LocalShippingIcon sx={{fontSize:'50px'}}/>
          <RestoreIcon sx={{fontSize:'50px'}}/>
          <ChecklistIcon sx={{fontSize:'50px'}}/>
        </div>
      </article>
      <article className='mt-20 rounded-xl shadow-xl flex bg-[#1F1D2B] min-w-[350px] w-ful pb-10 pt-10 lg:mr-40 flex-col items-center lg:w-full lg:mt-20 sm:pl-0 m-auto lg:ml-40'>
        <h4 className='w-full flex flex-row justify-center items-center m-auto text-gray-300 text-3xl mb-3'>{currentAuth}</h4>
        <div className='w-full flex flex-row justify-center gap-10 items-center mt-10'>
          <button onClick={()=>login()}>
            <GoogleIcon className='hover:text-white transition-color' color='error' sx={{fontSize:'40px'}}/>
          </button>
          <button>
            <FacebookIcon className='hover:text-white transition-color' color='info' sx={{fontSize:'40px'}}/>
          </button>
          <button>
            <GitHubIcon className='hover:text-white transition-color' color='secondary' sx={{fontSize:'40px'}}/>
          </button>
        </div>
        <span className='relative mb-1 mt-10 w-full text-white before:content: ""
                before:w-80 before:absolute before:top-1/2 before:h-[1px] before:bg-gray-500 before:leff-0 flex flex-row justify-center m-auto items-center'>
            <span className='bg-[#1F1D2B] pr-5 pl-5 absolute letter-spacing-normal inline-block text-xl text-gray-100'>
                    Or instead
            </span>
        </span>
        {getAuthForm(currentAuth)}
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

export default React.memo(Auth);
