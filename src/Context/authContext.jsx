import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [ session , setSession ] = useState(JSON.parse(sessionStorage.getItem('auth')) || []);
    const [ hasPassword , setHasPassword ] = useState(JSON.parse(sessionStorage.getItem('auth_pass')) || '' );

    const recoverySession = ( auth )=>{
        setSession(auth)
    }

    const logOut = ()=>{
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('auth_pass');
        setSession([]);
        window.location='/';
    }

    useEffect(()=>{
        // Set first coockies to avoid third blocked cookies
       setHasPassword( JSON.parse(sessionStorage.getItem('auth_pass')) );

    },[ session ])

    return (
        <AuthContext.Provider value={{session , setSession , recoverySession , setHasPassword , logOut , hasPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext , AuthProvider } 
