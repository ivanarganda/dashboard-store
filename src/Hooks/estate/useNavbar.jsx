import React, { useCallback, useEffect, useState } from 'react'
import { categories } from '../../helpers/dataNavbarCategories';

export default function useNavbar( type ) {

    const [ items , setItems ] = useState([]);

    const createNavbar = useCallback(()=>{
        let navbar = {
            'categories': categories
        }

        setItems(navbar[type]);


        items.map(( item )=>{ return item; })
        
    },[ items ])

    useEffect(()=>{

        createNavbar();

    },[]);

    return [ items ];

}
