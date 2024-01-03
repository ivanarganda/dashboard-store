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

  const goToHome = () => {
    setFilter('');
    setTypeMenu('');
  }

  const handleFilter = (filter) => {
    setFilter(filter);
  }

  const openMenu = (type) => {
    const styles = {
      'nav': 'bg-[#1C1F2F] rounded-xl border-l border-gray-700 lg:w-1/2 w-full w-full h-full top-0 right-0 fixed transition-all z-20',
    }

    let menus = {
      'ShoppingCart': <ShoppingCart styles={styles} />,
      'Favorites': <Favorites styles={styles} />,
      'Notifications': <Notifications styles={styles} />
    }

    setTypeMenu(menus[type])

  }

  return (
    <div className={`bg-[#262837] min-h-screen w-full`}>
      <Header handleFilter={handleFilter} filter={filter} />
      <Section initialState={state} products={products} addToCart={addToCart} addToFavorites={addToFavorites} format={{ currentLanguage }} filter={filter} />
      <Sidebar initialState={[false, state.cart.length, state.favorites.length, false]} showMenu={showMenu} functions={[goToHome, openMenu, openMenu, openMenu]} />
      <RightSidebar typeMenu={typeMenu} />
    </div>
  )
}

export default App;
