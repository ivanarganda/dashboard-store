import React , { useState } from 'react'

const MsgContext = React.createContext();


const MsgProvider = ({children})=>{

    const [ msg , setMsg ] = useState('');
    const [ opened , setOpenned ] = useState( false );
    const [ color , setColor ] = useState(null);
    const [ positions , setPositions ] = useState({
        vertical: 'bottom',
        horizontal: 'left',
    })
    const [ time , setTime ] = useState(2000);

    const handleClose = (event)=>{
        setOpenned(false);
    }

    const writeMessage = ( msg )=>{
        setOpenned( true );
        setMsg( msg );
    }

    return (
        <MsgContext.Provider value={{ color , setColor , msg , writeMessage , opened , handleClose , positions , setPositions , time , setTime }}>
            {children}
        </MsgContext.Provider>
    )
}

export { MsgContext , MsgProvider }