import React , { useState } from 'react'

export default function useValidateForm() {
        
    const [ fields , setFields ] = useState({
        nickname:'',
        username:'',
        email:'',
        password:''
    });

    const handleFields = ( e )=>{

        const { name , value } = e.target;

        setFields({
            ...fields,
            [name]:value
        })

        console.log( fields );

    }

    const submitForm = ( e )=>{

        e.preventDefault();

        console.log( e.target );

    }

    return [ fields , handleFields , submitForm ];
    
}
