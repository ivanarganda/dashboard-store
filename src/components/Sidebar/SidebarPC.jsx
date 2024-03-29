import React , { useContext } from 'react'
import { useSidebar } from '../../Hooks/estate/useSidebar';
import { AuthContext } from "./../../Context/authContext";
import { Link } from 'react-router-dom';

export default function SidebarPC( props ) {

  const { initialState , session , typeMenu } = props;

  const [ itemsTop ] = useSidebar('top' , session );

  return (
    <nav className={`bg-[#1F1D2B] rounded-tr-xl rounded-br-xl transition-all fixed lg:left-0 -left-full top-0 flex flex-col justify-around fixed top-0 h-full w-28 z-50`}>
        <main>
            <h1 className={`text-[#E5E3E3] text-3xl uppercase font-bold text-center mt-5`}>Tech</h1>
        </main>
        <ul className='pl-4 mt-3 flex flex-col justify-around h-full'>
          {
            itemsTop?.map(( item , idx )=>{

              var active = 'hover:text-[#E5E3E3]  hover:bg-[#ec7c6a]  hover:rounded-tl-xl  hover:rounded-tr-xl  hover:rounded-bl-xl  hover:rounded-br-xl';

              if ( item.item == typeMenu ){
                  active = 'bg-[#ec7c6a] text-white rounded-tl-xl  rounded-tr-xl rounded-bl-xl  rounded-br-xl';
              }

              return <Link key={idx} to={item.path} className={`hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl transition-all`}>
                    <span className={`${active} p-4 flex  justify-center  text-[#ec7c6a] cursor-pointer`}>
                      { item.icon }{ initialState[idx]}
                    </span>
                </Link>
            })
          } 
        </ul>
    </nav>
  )
}
