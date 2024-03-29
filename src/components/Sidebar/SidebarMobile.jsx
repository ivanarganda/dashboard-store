import React , { useContext, useEffect } from 'react'
import { useSidebar } from '../../Hooks/estate/useSidebar';
import { AuthContext } from "./../../Context/authContext";
import { Link } from 'react-router-dom';

export default function SidebarMobile(props) {

    const { initialState , session , typeMenu } = props;

    const [ itemsMobile ] = useSidebar('mobile' , session );

    return (

        <nav className='bg-[#1F1D2B] lg:hidden fixed left-0 bottom-0 w-full py-5 rounded-tl-xl rounded-tr-xl z-50'>
            <ul className='flex flex-row justify-around flex-gap-1 p-3'>
                {
                    itemsMobile?.map(( li , idx )=>{ 

                        var active = 'hover:text-white';
                        if ( li.item === typeMenu ){
                            active = 'text-[#ec7c6a]';
                        }

                        return <Link to={li.path} className='pl-2 pr-2' key={li.item}>
                            <span className={`${active} text-[#bbb] transition-all cursor-pointer`}>{ li.icon }{ initialState[idx]}</span>
                            </Link> 
                    })
                }
            </ul>
        </nav>

    ) 

} 