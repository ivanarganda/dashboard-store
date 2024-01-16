import React from 'react'
import { Products } from './Products';

export default function Section( props ) {

  return (
      <Products 
      loading={props.loading}
      initialState={props.initialState} 
      products={props.products} 
      addToCart={props.addToCart} 
      addToFavorites={props.addToFavorites}
      deleteFromFavorites={props.deleteFromFavorites}
      state={props.dispatch} 
      format={ props.format } 
    />
  ) 
}
