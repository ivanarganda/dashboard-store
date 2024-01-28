export const initialState = {
  favorites: JSON.parse(sessionStorage.getItem('favorites')) || [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  totalPriceCart: 0,
  q:'',
  category:''
};

export const reducer = (state, action) => {

    if (action.type === 'RECOVERY_CART'){
      return {
        ...state,
        cart: action.payload
      }
    } 

    if ( action.type === 'RECOVERY_FAVORITES'){
      return {
        ...state,
        favorites: action.payload
      }
    }
    
    if (action.type === 'ADD_PRODUCT_CART') {
      let newProduct = action.payload.products.find((product) => product.id === action.payload.id);
    
      if (state.cart.some((item) => item.id === action.payload.id)) {
        // If the product already exists in the cart, increment its quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 0) + 1 } // Initialize quantity if it's undefined
              : item
          ),
        };
      } else {
        // If the product doesn't exist in the cart, add it with quantity 1
        return {
          ...state,
          cart: [...state.cart, { ...newProduct, quantity: 1 }], // Initialize quantity here
        };
      }
    }
    
    if (action.type === 'ADD_QUANTITY_PRODUCT_CART') {
      if (state.cart.some((item) => item.id === action.payload.id)) {
        // If the product already exists in the cart, update its quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: parseInt(action.payload.newQuantity) || 0 } // Ensure quantity is not undefined
              : item
          ),
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

    if (action.type === 'DELETE_FROM_CART') {
      return {
        ...state,
        cart: state.cart.filter((item)=> item.id !== action.payload.id ),
      };
  }

    // Filters
    if (action.type === 'search' || action.type === 'category' ){ 
      return {
        ...state,
        q: action.payload
      }
    }

    return state;

};
