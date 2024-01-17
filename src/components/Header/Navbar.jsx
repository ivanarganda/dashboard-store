import React from 'react'
import SearchForm from './SearchForm';
import './Header.css';
import useNavbar from './../../Hooks/estate/useNavbar';
import { useDate } from './../../Hooks/estate/useDate';

export default function Navbar( props ) {

  let { initialState , handleFilter } = props;

  const [ currentDate ] = useDate();

  const navbarCategories = useNavbar('categories');

  return (
    <>
      <main className='lg:pl-28 bg-[#1F1D2B] fixed w-full top-0 pb-4 z-10 flex flex-col h-25'>
        <nav className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8'>
          <article className='lg:col-span-4 flex flex-col items-center'>
            <h1 className='text-gray-300 text-2xl'>Ivan Gonzalez Valles</h1>
            <p className='text-gray-400'>{currentDate}</p> 
          </article>
          <article className='lg:col-span-3 sm:w-1/2 md:w-2/3 m-auto lg:w-full w-2/3 relative'>
            <SearchForm initialState={initialState} handleFilter={handleFilter} />
          </article>
          <nav className='hidden sm:w-2/3 sm:gap-6 sm:mx-auto sm:justify-center sm:flex md:col-span-7 md:w-2/3 relative m-auto mt-10 text-gray-300 md:flex md:items-center md:justify-between md:content-center px-10 
              after:border-b after:absolute after:bg-white-400 after:w-full after:bottom-0 after:border-b-gray-500'>
            {
              navbarCategories[0]?.map(( item , idx )=>{
                  let style = 'hover:text-[#ec7c6a]';
                  if( initialState.q != '' && initialState.q == item.item ){
                    style = 'text-[#ec7c6a]';
                  }
                  return <span key={idx} onClick={()=>handleFilter('category' , item.item)} className={`${ style } font-bold cursor-pointer transition-all`}>{item.item}</span>
              })
            }            
          </nav>
        </nav>
        
      </main>
      
    </>
    
  )
}
