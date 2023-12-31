import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function SearchForm(){
  return (
    <form>
        <SearchOutlinedIcon className='absolute left-2 top-1' sx={{color:'white'}}/>
        <label htmlFor="search"></label>
        <input type="search" name="search" className='w-full bg-gray-400 bg-opacity-20 pl-10 pr-3 px-4 p-1 text-gray-300 rounded-md outline-none' id="search" />
    </form>
  )
}
