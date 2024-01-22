import React, { useState , useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [ session , setSession ] = useState(JSON.parse(sessionStorage.getItem('auth')) || []);

    const recoverySession = ( auth )=>{
        setSession(auth)
    }

    return (
        <AuthContext.Provider value={{session, recoverySession }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext , AuthProvider }
