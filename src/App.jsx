import React, { useState, useEffect, useReducer , useCallback } from "react";
import Sidebar from './components/Sidebar/Sidebar';
import Header from "./components/Header/Header";
import Section from "./components/Sections/Section";

// Right sidebar
import RightSidebar from './components/RightSidebar/RightSidebar';
import ShoppingCart from './components/RightSidebar/ShoppingCart';
import Favorites from './components/RightSidebar/Favorites';
import Notifications from './components/RightSidebar/Notifications';
import useLanguage from "./Hooks/estate/useLanguage";

import { reducer, initialState } from './Hooks/reducer/useProducts';
import axios from 'axios';
import { useIndexSearch } from "./Hooks/estate/useIndexSearch";

function App() {

  const [showMenu, setShowMenu] = useState(false);
  const [typeMenu, setTypeMenu] = useState('');
  const [type, setType] = useState('');
  const [currentLanguage] = useLanguage('en');
  const [products, setProducts] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const index = useCallback(()=> useIndexSearch( products ) , [products]);
  
  useEffect(() => {
    axios.get(`https://ws-dashboard-store.onrender.com/api/products_dev`).then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  // Function to perform a search and update filteredProducts
  function performSearch(query, index) {
    if (index && query.trim() !== '') {
        const filtered = products.filter((product) => { 
        
        return (
            (
            (product.category && product.category.includes(query)) ||
            (product.name && product.name.includes(query)) ||
            (product.specifications && product.specifications.processor && product.specifications.processor.includes(query)) ||
            (product.id && product.id.toString().includes(query))
            ) ||
            (product.category !== '' && state.category == product.category)
        );
        });
        setFilteredProducts(filtered);
    } else {
        setFilteredProducts(products); // Show all products when search is empty
    }
  }

  useEffect(() => {
    // Perform search whenever state.q changes
    performSearch(state.q, index);
  }, [state.q,index]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    recoveryCart(savedCart);
  }, [initialState]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart)) || [];
  }, [state]);

  const recoveryCart = (cart) => {
    dispatch({ type: 'RECOVERY_CART', payload: cart });
  }

  const handleChangeQuantity = (id, event) => {
    let newQuantity = event.value;
    if (newQuantity !== '') {
      dispatch({ type: 'ADD_QUANTITY_PRODUCT_CART', payload: { newQuantity, id } });
    }
  }

  const addToCart = (id) => {
    dispatch({ type: 'ADD_PRODUCT_CART', payload: { products, id } });
  }

  const addToFavorites = (id) => {
    dispatch({ type: 'ADD_FAVORITE_PRODUCT', payload: { products, id } })
  }

  const deleteFromFavorites = (id) => {
    dispatch({ type: 'DELETE_FAVORITE_PRODUCT', payload: { products, id } })
  }

  const deleteFromCart = (id) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: { products, id } })
  }

  const goToHome = () => {
    setTypeMenu('')
    setType('');
    setShowMenu(false);
  }

  const handleFilter = (type, filter) => {
    dispatch({ type: type, payload: filter })
  }

  const styles = {
    'aside': `bg-black bg-opacity-80 w-full h-screen overflow-auto top-0 ${showMenu ? 'right-0' : '-right-full'} z-20 transition-all fixed text-white flex flex-col justify-around items-start`,
    'sections': 'h-3/4 md:h-2/3 lg:h-full lg:pb-10 w-full flex flex-col justify-center items-center relative md:w-full lg:w-full overflow-auto'
  }

  const closeMenu = () => {
    setTypeMenu('')
    setType('');
    setShowMenu(false);
  }

  const openMenu = (type) => {
    let menus = {
      'ShoppingCart': <ShoppingCart styles={styles.sections} cart={state} handleChangeQuantity={handleChangeQuantity} deleteFromCart={deleteFromCart}/>,
      'Favorites': <Favorites styles={styles.sections} />,
      'Notifications': <Notifications styles={styles.sections} />
    }
    setTypeMenu(menus[type])
    setShowMenu(true);
    setType(type);
  }

  return (
    <div className={`bg-[#262837] min-h-screen w-full`}>
      <Header initialState={state} handleFilter={handleFilter} />
      <Section
        loading={loading}
        initialState={state}
        products={filteredProducts} // Use filteredProducts instead of products
        addToCart={addToCart}
        addToFavorites={addToFavorites}
        deleteFromFavorites={deleteFromFavorites}
        format={{ currentLanguage }}
      />
      <Sidebar
        initialState={[false, state.cart.length, state.favorites.length, false]}
        typeMenu={type}
        showMenu={showMenu}
        functions={[goToHome, openMenu, openMenu, openMenu]}
      />
      <RightSidebar styles={styles.aside} typeMenu={typeMenu} type={type} closeMenu={closeMenu} />
    </div>
  )
}

export default App;
