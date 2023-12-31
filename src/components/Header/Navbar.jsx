import React from 'react'
import SearchForm from './SearchForm';
import './Header.css';

export default function Navbar() {
  return (
    <>
      <main className='lg:pl-28'>
        <nav className='grid grid-cols-1 lg:grid-cols-8 items-center justify-center'>
          <article className='lg:col-span-4 flex flex-col items-center'>
            <h1 className='text-gray-300 text-2xl'>Ivan Gonzalez Valles</h1>
            <h3 className='text-gray-400'>Sunday,31 Dec 2023</h3>
          </article>
          <article className='lg:col-span-2 w-1/2 m-auto lg:w-full relative'>
            <SearchForm />
          </article>
          <nav className='lg:col-span-4 px-10 lg:w-1/2 w-full m-auto mt-10 text-gray-300 flex items-center justify-between lg:gap-24'>
            <a>Laptops</a>
            <a>Cameras</a>
            <a>Keyboards</a>
            <a>SSDs</a>
            <a>HDDs</a>
          </nav>
        </nav>
        
      </main>
      
    </>
    
  )
}
