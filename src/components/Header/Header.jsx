import React from 'react'
import Navbar from './Navbar';
import { initialState } from '../../Hooks/reducer/useProducts';

export default function Header( props ) {  

  return (
    <header>
      <Navbar initialState={props.initialState} handleFilter={props.handleFilter}/>
    </header>
  )
}
