import React, { useState, useEffect , useReducer } from "react";
import Sidebar from './components/Sidebar/Sidebar';
import Header from "./components/Header/Header";
import Section from "./components/Sections/Section";

// Right sidebar
import RightSidebar from './components/RightSidebar/RightSidebar';
import ShoppingCart from './components/RightSidebar/ShoppingCart';
import Favorites from './components/RightSidebar/Favorites';
import Notifications from './components/RightSidebar/Notifications';
import useLanguage from "./Hooks/estate/useLanguage";

import { reducer , initialState , useProducts } from './Hooks/reducer/useProducts';

function App() {

  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState('');
  const [typeMenu, setTypeMenu] = useState('');
  const [ type , setType ] = useState('');
  const [currentLanguage] = useLanguage('en');
  const [products , setProducts ] = useState([]);

  useEffect(()=>{
    setProducts( useProducts() );
  },[initialState])

  const [state, dispatch] = useReducer(reducer , initialState);

  const addToCart = ( id )=>{
    dispatch({ type: 'ADD_PRODUCT_CART', payload: { products , id } });
  }

  const addToFavorites = ( id )=>{
    dispatch({ type: 'ADD_FAVORITE_PRODUCT', payload: { products , id } })
  }

  const deleteFromFavorites = ( id )=>{
    dispatch({ type: 'DELETE_FAVORITE_PRODUCT', payload: { products , id } })
  }

  const goToHome = () => {
    setFilter('');
    setTypeMenu('');
    setType('');
    setShowMenu(false);
  }

  const handleFilter = (filter) => {
    setFilter(filter);
  }

  const styles = {
    'nav': 'rgba(0, 0, 0, 0.8) rounded-xl border-l border-gray-700 lg:w-full w-full w-full h-full top-40 right-0 fixed transition-all z-20',
    'sections':''
  }

  const closeMenu = ()=>{
    setTypeMenu('')
    setType('');
    setShowMenu(false);
  }

  const openMenu = (type) => { 

    let menus = {
      'ShoppingCart': <ShoppingCart styles={styles.sections} cart={state.cart} />,
      'Favorites': <Favorites styles={styles.sections} />,
      'Notifications': <Notifications styles={styles.sections} />
    }

    setTypeMenu(menus[type])
    setType(type);
    setShowMenu(true);
  }

  return (
    <div className={`bg-[#262837] min-h-screen w-full`}>
      <Header handleFilter={handleFilter} filter={filter} />
      <Section initialState={state} products={products} addToCart={addToCart} addToFavorites={addToFavorites} deleteFromFavorites={deleteFromFavorites} format={{ currentLanguage }} filter={filter} />
      <Sidebar  initialState={[false, state.cart.length, state.favorites.length, false]} typeMenu={type} showMenu={showMenu} functions={[goToHome, openMenu, openMenu, openMenu]} />
      <RightSidebar styles={styles.nav} showMenu={showMenu} typeMenu={typeMenu} closeMenu={closeMenu} />
    </div>
  )
}

export default App;
