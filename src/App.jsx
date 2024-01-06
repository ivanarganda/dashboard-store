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
import { useLocalStorage } from './Hooks/estate/useLocalStorage';

function App() {

  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState('');
  const [typeMenu, setTypeMenu] = useState('');
  const [ type , setType ] = useState('');
  const [currentLanguage] = useLanguage('en');
  const [products , setProducts ] = useState([]);
  const [state, dispatch] = useReducer(reducer , initialState);

  useEffect(()=>{
    setProducts( useProducts() );
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    recoveryCart( savedCart ); 
  },[initialState])

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(state.cart)) || [];
  },[state]) 

  const recoveryCart = ( cart )=>{
    dispatch({ type: 'RECOVERY_CART' , payload: cart}) 
  }
  
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
    'aside': `bg-black bg-opacity-80 w-full h-screen overflow-auto top-0 ${showMenu ? 'right-0' : '-right-full'} z-20 transition-all fixed text-white flex flex-col justify-around items-start`,
    'sections':'h-3/4 md:h-2/3 lg:h-full lg:pb-10 w-full flex flex-col justify-center items-center relative md:w-full lg:w-full overflow-auto'
  }

  const closeMenu = ()=>{
    setTypeMenu('')
    setType('');
    setShowMenu(false);
  }

  const openMenu = (type) => { 

    let menus = {
      'ShoppingCart': <ShoppingCart  styles={styles.sections} cart={state.cart} />,
      'Favorites': <Favorites styles={styles.sections} />,
      'Notifications': <Notifications styles={styles.sections} />
    }

    setTypeMenu(menus[type])
    setShowMenu(true);
    setType(type);

  }

  return (
    <div className={`bg-[#262837] min-h-screen w-full`}>
      <Header handleFilter={handleFilter} filter={filter} />
      <Section initialState={state} products={products} addToCart={addToCart} addToFavorites={addToFavorites} deleteFromFavorites={deleteFromFavorites} format={{ currentLanguage }} filter={filter} />
      <Sidebar  initialState={[false, state.cart.length, state.favorites.length, false]} typeMenu={type} showMenu={showMenu} functions={[goToHome, openMenu, openMenu, openMenu]} />
      <RightSidebar styles={styles.aside} typeMenu={typeMenu} type={type} closeMenu={closeMenu} />
    </div>
  )
}

export default App;
