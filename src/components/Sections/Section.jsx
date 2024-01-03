import React from 'react'
import { Products } from './Products';

export default function Section( props ) {

  return (
      <Products initialState={props.initialState} 
      products={props.products} 
      addToCart={props.addToCart} 
      addToFavorites={props.addToFavorites}
      state={props.dispatch} 
      format={ props.format } 
      filter={props.filter} 
    />
  ) 
}
