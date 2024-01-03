import React, { useEffect, useState } from 'react'
import contentLanguageES from './../../lang/es-ES.json'
import contentLanguageENG from './../../lang/en-EN.json'

export default function useLanguage( language ) {

    const [ currentLanguage , setCurrentLanguage ] = useState(contentLanguageES);

    useEffect(()=>{
        setCurrentLanguage( languages[ language ])
    },[])

    const languages = {

        'es':contentLanguageES,
        'en':contentLanguageENG

    }
    
    return [ currentLanguage ];

}
