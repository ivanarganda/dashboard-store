import { useEffect , useState } from 'react';
import { products } from './../../helpers/products';

export const initialState = {
  favorites: [],
  cart: [],
  totalPriceCart: 0,
};

export const reducer = (state, action) => {
    
    if (action.type === 'ADD_PRODUCT_CART') {
      let newProduct = action.payload.products.find((product) => product.id === action.payload.id);
  
      if (state.cart.some((item) => item.id === action.payload.id)) {
        // If the product already exists in the cart, increment its quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If the product doesn't exist in the cart, add it with quantity 1
        return {
          ...state,
          cart: [...state.cart, { ...newProduct, quantity: 1 }],
        };
      }
    }

    if (action.type === 'ADD_FAVORITE_PRODUCT') {
      let newProduct = action.payload.products.find((product) => product.id === action.payload.id);
      return {
        ...state,
        favorites: [...state.favorites, newProduct],
      };
    }

    if (action.type === 'DELETE_FAVORITE_PRODUCT') {
        return {
          ...state,
          favorites: state.favorites.filter((item)=> item.id !== action.payload.id ),
        };
      }

    return state;

};
  


export const useProducts = ()=>{

  return products;
 
}


