import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [ session , setSession ] = useState(JSON.parse(sessionStorage.getItem('auth')) || []);

    const recoverySession = ( auth )=>{
        setSession(auth)
    }

    return (
        <AuthContext.Provider value={{session , setSession , recoverySession }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext , AuthProvider }
