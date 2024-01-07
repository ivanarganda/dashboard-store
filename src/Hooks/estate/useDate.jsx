import React, { useEffect, useState } from 'react'
import moment from 'moment';

export const useDate = ( date = '')=>{

    const [ formatedDate , setFormatedDate ] = useState(''); 
    const now = moment();

    useEffect(()=>{
        setFormatedDate( date );
    },[ formatedDate ])
    
    const currentDate = ()=>{
         return now.format('dddd, DD MMM YYYY HH:mm:ss');
    }

    const formatDate = ()=>{
        return moment( formatedDate , 'dd-mm-YYYY' );
    }

    return [ currentDate() , formatDate() ]; 

}
