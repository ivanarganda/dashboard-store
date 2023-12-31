import React from 'react'
import { useSidebar } from '../../Hooks/estate/useSidebar';

export default function SidebarMobile(props) {

    const [ itemsMobile ] = useSidebar('mobile');

    const { initialState , typeMenu , functions } = props;

    return (

        <nav className='bg-[#1F1D2B] lg:hidden fixed left-0 bottom-0 w-full py-5 rounded-tl-xl rounded-tr-xl z-50'>
            <ul className='flex flex-row justify-between flex-gap-1 p-3'>
                {
                    itemsMobile?.map(( li , idx )=>{ 

                        var active = 'hover:text-white';
                        if ( li.item === typeMenu ){
                            active = 'text-[#ec7c6a]';
                        }

                        return <li className='pl-2 pr-2' key={li.item}>
                            <span onClick={ li.item == 'Home' ? functions[idx] : ()=>functions[idx]( li.item )} className={`${active} text-[#bbb] transition-all cursor-pointer`}>{ li.icon }{ initialState[idx]}</span>
                            </li> 
                    })
                }
            </ul>
        </nav>

    )
    

} 