import React from 'react'
import Navbar from './Navbar';

export default function Header( props ) {  

  return (
    <header>
      <Navbar filter={props.filter}/>
    </header>
  )
}
