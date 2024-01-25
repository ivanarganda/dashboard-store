import React , { useCallback, useEffect, useState } from 'react'

export const useMessage = ( msg , time , color , vertical = false , horizontal = false )=>{

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

    const setMessage = useCallback(()=>{
        setOpenned( true );
        setMsg( msg );
        setTime( time );
        setColor( color )
        if ( !vertical || !horizontal ){
            setPositions({
                ...positions,
                vertical:vertical,
                horizontal:horizontal
            })
        }
    },[])

    // useEffect(()=>{
    //     setMessage();
    // },[])

    return [ msg , color , positions , time , handleClose ];

}