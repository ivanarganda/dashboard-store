import React from 'react'
import { useSidebar } from './../Hooks/useSidebar';

export default function Sidebar(props) {

  const [ itemsTop ] = useSidebar('top');
  const [ itemsBottom ] = useSidebar('bottom');

  return (
    <nav className={`bg-[#1F1D2B] rounded-tr-xl rounded-br-xl transition-all fixed lg:left-0 top-0 flex flex-col justify-between fixed left-0 top-0 h-full w-28 z-50 ${props.showMenu ? 'left-0' : '-left-full'}`}>
        <ul className='pl-4 mt-3'>
          <main>
            <h1 className={`text-[#E5E3E3] text-3xl uppercase font-bold text-center mt-5`}>Tech</h1>
          </main>
          
          {
            itemsTop?.map(( item , idx )=>{
              return <li key={idx} className={`hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl transition-all`}>
                    <a className={`hover:text-[#E5E3E3] 
                                  hover:bg-[#ec7c6a] 
                                  hover:rounded-tl-xl 
                                  hover:rounded-tr-xl 
                                  hover:rounded-bl-xl 
                                  hover:rounded-br-xl 
                                  p-4 flex 
                                  justify-center 
                                  text-[#ec7c6a]
                                  cursor-pointer`}>
                      { item.icon }
                    </a>
                </li>
            })
          } 
        </ul>
        <ul className='pl-4 mt-3'>
          {
            itemsBottom?.map(( item , idx )=>{
              return <li key={idx} className={`hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl transition-colors`}>
                    <a className={`hover:text-[#E5E3E3] 
                                  hover:bg-[#ec7c6a] 
                                  hover:rounded-tl-xl 
                                  hover:rounded-tr-xl 
                                  hover:rounded-bl-xl 
                                  hover:rounded-br-xl 
                                  p-4 flex 
                                  justify-center 
                                  text-[#ec7c6a]
                                  cursor-pointer`}>
                      { item.icon }
                    </a>
                </li>
            })
          } 
        </ul>
    </nav> 
  )
}
