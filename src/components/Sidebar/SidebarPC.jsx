import React from 'react'
import { useSidebar } from '../../Hooks/estate/useSidebar';

export default function SidebarPC( props ) {

  const [ itemsTop ] = useSidebar('top');

  const { initialState , typeMenu , functions } = props;

  return (
    <nav className={`bg-[#1F1D2B] rounded-tr-xl rounded-br-xl transition-all fixed lg:left-0 -left-full top-0 flex flex-col justify-between fixed top-0 h-full w-28 z-50`}>
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

              return <li key={idx} className={`hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl transition-all`}>
                    <span onClick={ item.item == 'Home' ? functions[idx] : ()=>functions[idx]( item.item )} className={`${active} p-4 flex  justify-center  text-[#ec7c6a] cursor-pointer`}>
                      { item.icon }{ initialState[idx]}
                    </span>
                </li>
            })
          } 
        </ul>
    </nav>
  )
}
