import React, { useEffect } from 'react'
import Navbar from './Navbar';
import { initialState } from '../../Hooks/reducer/useProducts';

function Header( props ) {  

  return (
    <header>
      <Navbar initialState={props.initialState} handleFilter={props.handleFilter}/>
    </header>
  )
}

export default React.memo(Header);