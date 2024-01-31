import React, { useState , useContext } from 'react';
import axios from 'axios';
import { MsgContext } from '../../Context/messageContext';
import { AuthContext } from '../../Context/authContext';

export default function useValidateForm() {
  
  const { useMessage } = useContext( MsgContext );

  const { setSession } = useContext(AuthContext);

  const [ logged , setLogged ] = useState( false ); 

  const [fields, setFields] = useState({
    nickname: '',
    username: '',
    email: '',
    password: '',
  });

  const [securityPassword, setSecurityPassword] = useState(' border-b-4 border-red-500');

  const handleFields = (e) => {
    
    const { name, value } = e.target;

    const colorsSecurity = {
        low:` border-b-4 border-red-500`,
        medium:` border-b-4 border-orange-500`,
        high:` border-b-4 border-green-500`
    }
    
    if (fields.password !== '') {

      if (/^(?=.*[A-Z])/.test(fields.password)) {
        setSecurityPassword(colorsSecurity['low']);
      }
      if (/^(?=.*[A-Z])/.test( fields.password) && /(?=.*\d)/.test(fields.password)) {
        setSecurityPassword(colorsSecurity['medium']);
      }
      if (/^(?=.*[A-Z])/.test( fields.password) && /(?=.*\d)/.test(fields.password) && /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test( fields.password )) {
        setSecurityPassword(colorsSecurity['high']);
      } 

    } else {
       
        setSecurityPassword(colorsSecurity['low']); 

    }

    setFields({
      ...fields,
      [name]: value,
    });

  };

  const submitForm = async (e , type) => {
    e.preventDefault();
    await axios.post(`https://ws-api-tech.online/api/${type}` , e.target).then((response)=>{
        console.log( response.data );
        if ( response.data.status !== 200 ){
            useMessage(`${response.data.error.user}`, 'error', 4000, 'top', 'center');

        } else {
            useMessage(`Logged as ${response.data.data.user.username}`, 'success', 4000, 'top', 'center');
            setLogged( true );
            sessionStorage.setItem('auth',JSON.stringify(response.data));
            setSession(JSON.parse(sessionStorage.getItem('auth')));
            setTimeout(()=>{
              window.location='/';
            },3000)
            
        }
        
    })
  };

  return [fields, logged , securityPassword , handleFields, submitForm];

}
