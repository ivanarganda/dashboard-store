import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function SearchForm({handleFilter}){
  return (
    <form className='w-full min-w-fit relative'>
        <SearchOutlinedIcon className='absolute left-2 top-1' sx={{color:'white'}}/>
        <label htmlFor="search"></label>
        <input type="search" placeholder='Search product you desire' name="search" onChange={(event)=>handleFilter('search',event.target.value)} className='w-full bg-gray-400 bg-opacity-20 pl-12 pr-3 px-4 p-1 text-gray-300 rounded-md outline-none' id="search" />
    </form>
  )
}
