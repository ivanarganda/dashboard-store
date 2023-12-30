import React from 'react'
import { useSidebar } from './../Hooks/useSidebar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar(props) {

    const [ itemsMobile ] = useSidebar('mobile');

    const { showMenu , functions } = props;

    return (

        <nav className='bg-[#1F1D2B] lg:hidden fixed left-0 bottom-0 w-full py-5 rounded-tl-xl rounded-tr-xl'>
            <ul className='flex flex-row justify-between flex-gap-1 p-3'>
                {
                    itemsMobile?.map(( li , idx )=>{ 

                        if ( li.item == 'Menu icon' && showMenu ){
                            li.icon = <CloseOutlinedIcon sx={{fontSize:30}}/>
                        } else if ( li.item == 'Menu icon' && !showMenu ) {
                            li.icon = <MenuIcon sx={{fontSize:30}}/>;
                        }

                        return <li className='pl-2 pr-2' key={li.item}>
                            <span onClick={functions[idx]} className='hover:text-white text-[#bbb] transition-all cursor-pointer'>{li.icon}</span>
                            </li> 
                    })
                }
            </ul>
        </nav>

    )
    

} 