import React, { useEffect } from 'react'
import Navbar from './Navbar';

function Header( props ) {  

  return (
    <header id='header_main'>
      <Navbar initialState={props.initialState} handleFilter={props.handleFilter}/>
    </header>
  )
}

export default React.memo(Header);