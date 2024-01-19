import React,{ useCallback, useEffect, useState } from 'react'
import { sideBarTop } from '../../helpers/sideBarTop';
import { sidebarBottom } from '../../helpers/SidebarBottom';
import { sidebarMobile } from '../../helpers/sidebarMobile';

export const useSidebar = ( position , session )=>{

    const [ items , setItems ] = useState([]);

    const createSidebar = useCallback(()=>{

        const typeSidebar = {
            'top':sideBarTop( session ),
            'bottom':sidebarBottom,
            'mobile':sidebarMobile( session )
        }

        setItems( typeSidebar[ position ] );

        items.map(( i )=>{ return i })
    
    },[ items, session ])

    useEffect(()=>{

        createSidebar();
        
    },[])

    return [ items ];

}
