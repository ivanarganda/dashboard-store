import React, { useEffect , useContext , useState } from 'react';
import { AuthContext } from "./../../Context/authContext";
import { ImagesProductsContext } from '../../Context/imagesProducts';
import { especifications } from './../../helpers/specifications';
import BR from './../Tools/BR';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Pagination from '@mui/material/Pagination';

const Favorites = (props) => {

  let { loading , initialState , addToCart , addToFavorites , deleteFromFavorites } = props;
  const { session } = useContext( AuthContext );
  const [currentPage, setCurrentPage] = useState(1);
  const { images } = useContext( ImagesProductsContext );

  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
    <section className='w-full pt-10 sm:pt-10 md:pt-10 pb-10 lg:pl-20 xl:pl-10 grid md:grid-cols-2 xl:pl-60 lg:grid-cols-2 xl:grid-cols-3'>
       
      {
      loading ? <span className="w-full min-h-screen flex flex-col m-80 text-5xl text-gray-300">Loading...</span> :
      

      initialState.favorites.length === 0 ? 
        <div className='flex flex-row justify-center items-center m-auto w-full'>
          <h4 className='text-gray-300 text-2xl'>Favourites empty</h4>
        </div>
      :

      initialState.favorites?.map((p, idx) => {

        return  (
          <article className='h-full flex flex-col justify-center items-center' key={p.id}>
            <figure className='bg-gray-200 bg-opacity-10 w-80 mt-20 h-full relative flex flex-col justify-center items-center text-gray-400 rounded-xl'>
              <img src={images[p.id-1]} className='w-40 h-40 rounded absolute -top-14 border border-[#bbb]' alt="" />
              <figcaption className='w-full h-full flex m-auto flex-col items-center justify-center p-4'>
                <div className='w-full m-auto flex flex-col items-center mt-20 justify-around'>
                  <div className='mt-10'>
                    <p className='text-gray-100'>{p.name}</p>
                  </div>
                  <div className='mt-10'>
                    <ul>
                      {especifications[p.category]?.map((l, idx) => {
                          return <li key={idx}><span className='text-white capitalize'>{l}:</span><span className='text-gray-200'>{p.specifications[l]}</span></li>;
                      })}
                    </ul> 
                  </div>
                  <div className='mt-10'>
                    <p className='text-white'>{`${p.specifications.price}€`}</p>
                    {
                      initialState.cart?.find((item) => item.id === p.id) ? 
                      <p className='text-white'>Added to cart: {`${initialState.cart.find((item) => item.id === p.id).quantity}`}</p>
                      : 
                      <p className='text-white'>Added to cart: 0</p>
                    }
                  </div>
                </div>
                <div className='flex flex-row justify-around w-full mt-10'>
                     <button className='bg-[#262837] p-2 rounded-md text-white hover:bg-[#4B4B4B] transition-all' onClick={() => addToCart(p.id)}>Add to cart</button>
                  {
                   session.length !== 0 && ( 
                   initialState.favorites.find((index)=>index.id == p.id ) ? 
                      <button className='bg-[#ec7c6a] p-2 rounded-md text-white hover:bg-[#4B4B4B] transition-all' onClick={() => { deleteFromFavorites(p.id); }}>Delete from favorites</button> 
                      : 
                      <button className='bg-[#262837] p-2 rounded-md text-white hover:bg-[#4B4B4B] transition-all' onClick={() => { addToFavorites(p.id , p); }}>Add to favorites</button>
                    )}
                </div>
              </figcaption>
            </figure>
          </article>
        );
      })}
    </section>
    {initialState.favorites.length > 0 ?
      <>
      <Pagination
        onChange={handlePage}
        page={currentPage}
        showFirstButton
        showLastButton
        sx={{
          marginTop: '3rem',
          color: 'white',
          background: 'white',
          borderRadius: '0.4rem 0.4rem 0.4rem 0.4rem',
          width: '50%',
          minWidth: '350px',
          margin: 'auto',
          '@media (max-width: 400px)': {
            width: '80%',
            minWidth: '250px',
          },
        }}
        count={Math.ceil(initialState.favorites.length / 3)}
        color='primary'
        size={'medium'}
      /><BR/><BR/></>
     : 
      <div className='flex mt-[300px] flex-col justify-center items-center w-full'>
        <RemoveShoppingCartIcon sx={{ fontSize: '100px', color: 'white' }} /> 
        <h4 className='text-gray-300 text-2xl'>Shopping cart empty</h4>
      </div>}
      </>
  );
};

export default Favorites;