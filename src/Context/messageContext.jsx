import React , { useState } from 'react'

const MsgContext = React.createContext();


const MsgProvider = ({children})=>{

    const [ msg , setMsg ] = useState('');
    const [ opened , setOpenned ] = useState( false );

    const handleClose = (event)=>{
        setOpenned(false);
    }

    const writeMessage = ( msg )=>{
        setOpenned( true );
        setMsg( msg );
    }

    return (
        <MsgContext.Provider value={{ msg , writeMessage , opened , handleClose }}>
            {children}
        </MsgContext.Provider>
    )
}

export { MsgContext , MsgProvider }