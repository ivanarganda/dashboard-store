import React,{ useCallback, useEffect, useState } from 'react'
import { sideBarTop } from '../../helpers/sideBarTop';
import { sidebarBottom } from '../../helpers/sidebarBottom';
import { sidebarMobile } from '../../helpers/sidebarMobile';

export const useSidebar = ( position )=>{

    const [ items , setItems ] = useState([]);

    const createSidebar = useCallback(()=>{

        const typeSidebar = {
            'top':sideBarTop,
            'bottom':sidebarBottom,
            'mobile':sidebarMobile
        }

        setItems( typeSidebar[ position ] );

        items.map(( i )=>{ return i })
    
    },[ items ])

    useEffect(()=>{

        createSidebar();
        
    },[])

    return [ items ];

}
