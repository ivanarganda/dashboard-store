import React, { useState, useEffect, useReducer, useCallback , useRef , useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar/Sidebar';
import Header from "./components/Header/Header";
import Section from "./components/Sections/Section";
import RightSidebar from './components/RightSidebar/RightSidebar';
import ShoppingCart from './components/RightSidebar/ShoppingCart';
import Favorites from './components/RightSidebar/Favorites';
import Settings from './components/RightSidebar/Settings';
import Login from './components/Form/Login';
import BR from './components/Tools/BR.jsx';

import useLanguage from "./Hooks/estate/useLanguage";
import { reducer, initialState } from './Hooks/reducer/useProducts';
import { useIndexSearch } from "./Hooks/estate/useIndexSearch";
import { AuthContext } from "./Context/authContext";
import { PaginationContext } from './Context/paginationContext.jsx'
import Pagination_ from './components/Sections/Pagination';
import Snackbar_ from './components/Snackbar/Snackbar';
import { MsgContext } from "./Context/messageContext.jsx";


function App() {

  const [showMenu, setShowMenu] = useState(false);
  const [typeMenu, setTypeMenu] = useState('');
  const [type, setType] = useState('');
  const [currentLanguage] = useLanguage('en');
  const [products, setProducts] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const index = useCallback(() => useIndexSearch(products), [products]);
  const { session , recoverySession , hasPassword } = useContext( AuthContext );
  const { pagination , setPagination } = useContext( PaginationContext );
  const { useMessage , setColor , positions , setPositions , setTime } = useContext( MsgContext );
  const retrievedFavotires = useRef(false);
  

  useEffect(()=>{
    if ( hasPassword.password === false ){
      useMessage( `By security, adviced to have a password` , 'warning' , 2000 , 'top' , 'center' );
    }
  },[])

  useEffect(() => { 
    axios.get(`https://ws-dashboard-store.onrender.com/api/products_dev`)
      .then((response) => {
        setProducts(response.data);
        setPagination({ 
          ...pagination,
          totalPages:Math.ceil(response.data.length / pagination.perPage)
        })
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); 
      });
  }, []);

  const performSearch = useCallback((query, index) =>{
    if (index && query.trim() !== '') {
      const filtered = products.filter((product) => {
        return (
          (product.category && product.category.includes(query)) ||
          (product.name && product.name.includes(query)) ||
          (product.specifications && product.specifications.processor && product.specifications.processor.includes(query)) ||
          (product.id && product.id.toString().includes(query))
        ) ||
        (product.category !== '' && state.category == product.category);
      });

      setPagination({
        ...pagination,
        totalPages:Math.ceil(filtered.length / pagination.perPage)
      })

      setFilteredProducts(filtered.slice((pagination.currentPage - 1) * pagination.perPage , ((pagination.currentPage - 1) * pagination.perPage) + pagination.perPage) );
    } else {

      setPagination({
        ...pagination,
        totalPages:Math.ceil(products.length / pagination.perPage)
      })

      setFilteredProducts(products.slice((pagination.currentPage - 1) * pagination.perPage , ((pagination.currentPage - 1) * pagination.perPage) + pagination.perPage));
    }
  },[ filteredProducts, products, pagination ]);

  useEffect(() => {
    performSearch(state.q, index, pagination);
  }, [state.q, index , pagination.currentPage ]); 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const auth = JSON.parse(sessionStorage.getItem('auth')) || [];
    recoveryCart(savedCart);
    recoverySession(auth);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    sessionStorage.setItem('auth', JSON.stringify(session));
    
    if ( session.length !== 0 ){
      localStorage.setItem('cart', JSON.stringify(state.cart));
      sessionStorage.setItem('auth', JSON.stringify(session));
      sessionStorage.setItem('auth_pass', JSON.stringify({'password':session.data.user.password}));
      sessionStorage.setItem('favorites', JSON.stringify(state.favorites));

      if ( retrievedFavotires.current == false && state.favorites.length === 0 ){
          axios.get(`https://ws-api-tech.online/api/products/${session.data.user.id}`).then(( response )=>{
            let newJSON = [];
            newJSON = response.data.data[0].products.map((item)=>{
                return item.product;
            });
            recoveryFavorites( newJSON );
            retrievedFavotires.current = true;
        })
        
      }

    } 
     
  }, [state.cart, state.favorites , session ]);

  const recoveryCart = (cart) => {
    dispatch({ type: 'RECOVERY_CART', payload: cart });
  }

  const recoveryFavorites = (favorites) =>{
    dispatch({ type:'RECOVERY_FAVORITES' , payload:favorites})
  }

  const handleChangeQuantity = (id, currentQuantity) => {
    let newQuantity = currentQuantity;
    if (newQuantity !== '') {
      dispatch({ type: 'ADD_QUANTITY_PRODUCT_CART', payload: { newQuantity, id } });
    }
  }

  const addToCart = (id) => {
    try {
      dispatch({ type: 'ADD_PRODUCT_CART', payload: { products, id } });
      useMessage( 'Added to cart' , 'success' , 2000 , 'top' , 'center' );
    } catch ( error ){
      useMessage(  `Upps!!...Could not be added to cart` , 'error' , 2000 , 'top' , 'center' );
    }
  }

  const addToFavorites = (id , product ) => {
    
    dispatch({ type: 'ADD_FAVORITE_PRODUCT', payload: { products, id } })
    axios.post('https://ws-api-tech.online/api/products/create' , {
      id:id,
      product:JSON.stringify(product),
      user_id:session.data.user.id
    } ).then((response)=>{
      console.log( response.data );
    })
  
  }

  const deleteFromFavorites = (id) => {
    console.log( id );
    dispatch({ type: 'DELETE_FAVORITE_PRODUCT', payload: { products, id } })
    axios.delete(`https://ws-api-tech.online/api/products/delete/${id}/${session.data.user.id}`).then((response)=>{
      console.log( response );
    })
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
  
  return (
    <div className={`bg-[#262837] min-h-screen w-full`}>
      <Router>
        <Header initialState={state} handleFilter={handleFilter} />
        <BR />
        <Sidebar
          initialState={
            session.length !== 0 ?
              [false, state.cart.length, false , false]
              :
              [false, state.cart.length, false, false]
          }
          typeMenu={type}
          showMenu={showMenu}
        /> 
          <Routes>
            <Route exact={true} path="/" element={ <><Section
          loading={loading}
          initialState={state}
          products={filteredProducts}
          addToCart={addToCart}
          addToFavorites={addToFavorites}
          deleteFromFavorites={deleteFromFavorites}
          format={{ currentLanguage }}
        /> { products.length !== 0 && <Pagination_ />  }<BR /><BR /> </>}/>
            <Route exact={true} path="/cart" element={<ShoppingCart cart={state} handleChangeQuantity={handleChangeQuantity} deleteFromCart={deleteFromCart} />} />
            <Route exact={true} path="/favorites" element={<Favorites />}/>
            <Route exact={true} path="/settings" element={<Settings />} />
            <Route exact={true} path="/login" element={<Login />}/> 
          </Routes>
        </Router>
        <Snackbar_ sx={{ zIndex: '99' , position:'fixed' }}  /> 
    </div>
  )
}

export default App;
