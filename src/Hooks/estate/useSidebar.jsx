import React,{ useCallback, useEffect, useState , useContext } from 'react'
import { sideBarTop } from '../../helpers/sideBarTop';
import { sidebarBottom } from '../../helpers/SidebarBottom';
import { sidebarMobile } from '../../helpers/sidebarMobile';
import { AuthContext } from "./../../Context/authContext";

export const useSidebar = ( position )=>{

    const [ items , setItems ] = useState([]);
    const { session } = useContext( AuthContext );

    const createSidebar = useCallback(()=>{

        const typeSidebar = {
            'top':sideBarTop( session ),
            'bottom':sidebarBottom,
            'mobile':sidebarMobile( session )
        }

        setItems( typeSidebar[ position ] );

        items.map(( i )=>{ return i })
    
    },[ items ])

    useEffect(()=>{

        createSidebar();
        
    },[ session ])

    return [ items ];

}
