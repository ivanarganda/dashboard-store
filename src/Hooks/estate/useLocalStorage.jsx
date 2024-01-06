import React, { useEffect , useState } from 'react'

export const useLocalStorage = ( index , content = false )=>{

    const [ value , setValue ] = useState([]);

    const save = ()=>{
        localStorage.setItem( index , JSON.stringify( value ) )
    }

    const getStorage = ()=>{
        const contentJSON =  localStorage.getItem( index )
        return contentJSON == null ? false : JSON.parse( contentJSON );
    }

    useEffect(()=>{
        setValue( content );
    },[ content ])

    return [ getStorage , save ];

}
