import React from 'react'
import SearchForm from './SearchForm';
import './Header.css';

export default function Navbar() {
  return (
    <>
      <main className='lg:pl-28'>
        <nav className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 items-center justify-center'>
          <article className='lg:col-span-4 flex flex-col items-center'>
            <h1 className='text-gray-300 text-2xl'>Ivan Gonzalez Valles</h1>
            <h3 className='text-gray-400'>Sunday,31 Dec 2023</h3>
          </article>
          <article className='lg:col-span-3 sm:w-1/2 md:w-2/3 m-auto lg:w-full w-2/3 relative'>
            <SearchForm />
          </article>
          <nav className='hidden sm:w-2/3 sm:gap-6 sm:mx-auto sm:justify-center sm:flex md:col-span-7 md:w-2/3 relative m-auto mt-10 text-gray-300 md:flex md:items-center md:justify-between md:content-center px-10 
              after:border-b after:absolute after:bg-white-400 after:w-full after:bottom-0 after:border-b-gray-500'>
            <a className='w-full hover:text-[#ec7c6a] font-bold cursor-pointer transition-all'>Laptops</a>
            <a className='w-full hover:text-[#ec7c6a] font-bold cursor-pointer transition-all'>Cameras</a>
            <a className='w-full hover:text-[#ec7c6a] font-bold cursor-pointer transition-all'>Keyboards</a>
            <a className='w-full hover:text-[#ec7c6a] font-bold cursor-pointer transition-all'>SSDs</a>
            <a className='w-full hover:text-[#ec7c6a] font-bold cursor-pointer transition-all'>HDDs</a>
          </nav>
        </nav>
        
      </main>
      
    </>
    
  )
}
