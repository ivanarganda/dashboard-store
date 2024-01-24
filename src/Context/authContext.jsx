import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [ session , setSession ] = useState(JSON.parse(sessionStorage.getItem('auth')) || []);
    const [ hasPassword , setHasPassword ] = useState(JSON.parse(sessionStorage.getItem('auth_pass')) || '' );

    const recoverySession = ( auth )=>{
        setSession(auth)
    }

    useEffect(()=>{
       setHasPassword( JSON.parse(sessionStorage.getItem('auth_pass')) );
    },[ session ])

    return (
        <AuthContext.Provider value={{session , setSession , recoverySession , setHasPassword , hasPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext , AuthProvider }
