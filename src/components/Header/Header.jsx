import React from 'react'
import Navbar from './Navbar';

export default function Header( props ) {  

  return (
    <header>
      <Navbar handleFilter={props.handleFilter} filter={props.filter}/>
    </header>
  )
}
