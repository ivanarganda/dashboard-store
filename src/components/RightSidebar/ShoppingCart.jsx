import React, { useEffect, useState, useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import { especifications } from './../../helpers/specifications';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ImagesProductsContext } from '../../Context/imagesProducts';
import CheckIcon from '@mui/icons-material/Check';
import BR from './../Tools/BR';

export default function ShoppingCart(props) {
  const { styles, cart, handleChangeQuantity, deleteFromCart } = props;
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [itemsShopping, setItemsShopping] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { images } = useContext(ImagesProductsContext);

  const loadProductsCart = () => {
    return cart.cart;
  };

  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setItemsShopping(loadProductsCart());
  }, [cart, currentQuantity]); // Removed 'itemsShopping' and 'deleteFromCart' from dependencies

  const handleDeleteFromCart = (itemId) => {
    deleteFromCart(itemId);
    setItemsShopping((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const purchageForm = (event)=>{
      console.log( event.target );
  }

  return (
    <>
    <div className='mt-20 sm:mt-12 md:mt-24 lg:mt-13'>
    </div>
    <article className='w-1/4 flex flex-row justify-center items-center rounded-xl shadow-xl flex bg-[#1F1D2B] min-w-[350px] m-auto'>
        <form className='flex w-full flex-col p-6 min-w-fit' onSubmit={purchageForm}>
          <div className='flex flex-col relative justify-center w-full min-w-fit mt-2'>
              <textarea hidden className='relative bg-gray-100 text-lg text-gray-600 font-bold rounded-md p-2 outline-none apearance-none'  name="" id="" cols="30" rows="10"></textarea>
              <span className='flex flex-row justify-start items-start w-full m-auto text-gray-300 text-xl mb-1'>Total price: </span>
          </div>
          <div className='flex flex-col relative justify-center w-full min-w-fit mt-2'>
              <span className='flex flex-row justify-start items-start w-full m-auto text-gray-300 text-md mb-1'>Total price: </span>
          </div>
          <div className='flex flex-col relative justify-center w-full min-w-fit mt-2'>
              <span className='flex flex-row justify-start items-start w-full m-auto text-gray-300 text-md mb-1'>IVA tax: 10,47%</span> 
          </div>
          <div className='flex flex-row-reverse relative justify-center items-center w-full gap-5 min-w-fit mt-2'>
              <button className='flex flex-row bg-green-600 p-2 rounded-md justify-center items-center w-2/3 m-auto text-gray-300 min-w-fi  t text-md mb-1'>Add cupon code</button>
              <input type="text" className='relative bg-gray-100 text-xs text-gray-600 w-full min-w-fit font-bold rounded-md p-2 outline-none apearance-none' />
          </div>
          <div className='flex flex-row w-full m-auto items-center justify-center mt-1 space-x-20'>
            <button className='p-2 mt-4 rounded-md bg-orange-400 text-gray-100 text-lg hover:bg-orange-800 active:bg-tomato transition-all w-full'>Complete order</button>
          </div>
        </form>          
    </article>
    <section className='w-full pt-10 sm:pt-10 md:pt-10 pb-10 lg:pl-20 xl:pl-10 grid md:grid-cols-2 xl:pl-60 lg:grid-cols-2 xl:grid-cols-2'>
        {itemsShopping
          .slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
          .map((item) => {
            return (
              <>
              <article className='h-full md:-ml-0 xl:-ml-40 flex flex-col justify-center items-center pb-3' key={item.id}>
                <div key={item.id} className='bg-gray-200 pb-2 bg-opacity-10 w-2/3 min-w-[350px] shadow-2xl mt-20 h-full relative flex flex-col justify-center items-center text-gray-400 rounded-xl'>
                  <div className='relative w-40 h-40 flex items-center m-auto'>
                    <img className='w-full h-full rounded absolute -top-14 border border-[#bbb]' src={images[item.id - 1]} alt={item.url} />
                    <span
                      onClick={() => {
                        handleDeleteFromCart(item.id);
                      }}
                      className='absolute -top-20 right-1/3 p-1 rounded-2xl bg-gray-100 shadow-xl cursor-pointer hover:text-gray-600 hover:bg-white transition-all'
                    >
                      <ClearOutlinedIcon sx={{ fontSize: '30px' }} color='white' />
                    </span>
                  </div>
                  <form className='relative w-full min-w-fit flex flex-col items-center m-auto'>
                    <h4 className='text-gray-100 -mt-10'>{item.name}</h4>
                    <label className='mt-5 w-full min-w-fit flex flex-row justify-center items-center'>
                      <span>
                        <ul>
                          {especifications[item.category].map((l, idx) => {
                            if ( l == 'price' ){
                              return <li></li>;
                            }
                            return <li className='flex flex-row space-x-2 text-gray-200' key={idx}><CheckIcon sx={{fontSize:'30px'}} color='success'/>{l}: { item.specifications[l] }</li>;  
                          })}
                          <li className='flex flex-row space-x-2 text-gray-200' ><CheckIcon sx={{fontSize:'30px'}} color='success'/>Price: { item.specifications.price }€</li>    
                        </ul>
                      </span>
                    </label>
                  </form>
                  <span className='relative flex flex-col items-center m-auto mt-10'>
                    <b className='text-white'>Quantity:</b>
                    <div className='relative flex flex-row items-center m-auto mt-[10px]'>
                      <button
                        className='rounded m-1 border-gray-600 text-black font-bold outline-none bg-white w-10 border hover:bg-gray-300 transition-all'
                        onClick={(event) => {
                          event.preventDefault();

                          if (parseInt($('#inputQuantity' + item.id).val()) < 2) {
                            handleDeleteFromCart(item.id);
                            return;
                          }

                          let updatedQuantity = parseInt($('#inputQuantity' + item.id).val()) - 1;
                          handleChangeQuantity(item.id, updatedQuantity);
                          $('#inputQuantity' + item.id).val(updatedQuantity);
                        }}
                      >
                        -
                      </button>
                      <input
                        type='text'
                        className='rounded m-1 border-gray-600 text-black font-bold w-6 outline-none w-8 border pl-2'
                        defaultValue={item.quantity}
                        onChange={(event) => handleChangeQuantity(item.id, event.target.value)}
                        id={'inputQuantity' + item.id}
                      />
                      <button
                        className='rounded m-1 border-gray-600 text-black font-bold outline-none bg-white w-10 border hover:bg-gray-300 transition-all'
                        onClick={(event) => {
                          event.preventDefault(); 
                          let updatedQuantity = parseInt($('#inputQuantity' + item.id).val()) + 1;
                          handleChangeQuantity(item.id, updatedQuantity);
                          $('#inputQuantity' + item.id).val(updatedQuantity);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </span>
                  <div className='w-full pl-4 pr-4 flex flex-row justify-center items-center'>
                    <button className='text-white w-full mt-4 bg-[#262837] p-2 rounded hover:bg-[#4B4B4B] transition-all'>Buy</button>
                  </div>
                </div>
              </article>
              </>
            );
          })}

          

        {/* Pagination */}
    </section>
    {itemsShopping.length > 0 ? 
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
        count={Math.ceil(itemsShopping.length / 3)}
        color='primary'
        size={'medium'}
      /></>
     : 
      <div className='flex mt-[300px] flex-col justify-center items-center w-full'>
        <RemoveShoppingCartIcon sx={{ fontSize: '100px', color: 'white' }} />
        <h4 className='text-gray-300 text-2xl'>Shopping cart empty</h4>
      </div>
    }
    <BR /><BR />
    </>
  )
}
