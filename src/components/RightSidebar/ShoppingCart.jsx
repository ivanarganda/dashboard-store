import React, { useEffect, useState , useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import { especifications } from './../../helpers/specifications';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ImagesProductsContext } from '../../Context/imagesProducts';

export default function ShoppingCart(props) {
  const { styles, cart, handleChangeQuantity, deleteFromCart } = props;
  const [ currentQuantity , setCurrentQuantity ] = useState(0);
  const [itemsShopping, setItemsShopping] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { images } = useContext( ImagesProductsContext ); 

  const loadProductsCart = () => {
    return cart.cart;
  };

  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setItemsShopping(loadProductsCart());
  }, [cart,currentQuantity]); // Removed 'itemsShopping' and 'deleteFromCart' from dependencies

  const handleDeleteFromCart = (itemId) => {
    deleteFromCart(itemId);
    setItemsShopping((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <>
    <section className={`w-full flex flex-row justify-center items-center m-auto`}>
      {itemsShopping
        .slice((currentPage - 1) * 3, (currentPage - 1) * 3 + 3)
        .map((item) => {
          return (
            <div key={item.id} className='flex flex-col w-1- mt-40 p-5 ml-10 rounded-2xl justify-center bg-gray-300'>
              <div className='relative flex items-center m-auto'>
                <img className='w-40 h-40 rounded-2xl' src={images[item.id-1]} alt={item.url} />
                <span
                  onClick={() => {
                    handleDeleteFromCart(item.id);
                  }}
                  className='absolute -top-11 right-1/3 p-1 rounded-2xl bg-gray-400 cursor-pointer hover:text-gray-600 hover:bg-white transition-all'
                >
                  <ClearOutlinedIcon sx={{fontSize:'30px'}} color='white' />
                </span>
              </div>
              <form className='relative flex flex-col items-center m-auto'>
                <h4>{item.name}</h4>
                <label>
                  <span>
                      <ul>
                        {especifications[item.category].map((l, idx) => {
                          return <li key={idx}>{l}: {item.specifications[l]}</li>;
                        })}
                      </ul>
                  </span>
                </label>
              </form>
              <span className='relative flex flex-col items-center m-auto'>
                <b>Quantity:</b>
                <div className='relative flex flex-row items-center m-auto'>
                <button
                  className='text-black font-bold outline-none bg-white w-10 border hover:bg-gray-300 transition-all'
                  onClick={(event) => {
                    event.preventDefault();

                    if ( parseInt($('#inputQuantity' + item.id).val()) < 2 ){
                      handleDeleteFromCart( item.id );
                      return;
                    }

                    let updatedQuantity = parseInt($('#inputQuantity' + item.id).val()) - 1;
                    handleChangeQuantity(item.id, updatedQuantity);
                    $('#inputQuantity' + item.id).val( updatedQuantity );
                  }}
                >
                  -
                </button>
                <input
                  type='text'
                  className='text-black font-bold w-6 outline-none w-8 border pl-2'
                  defaultValue={item.quantity}
                  onChange={(event) => handleChangeQuantity(item.id, event.target.value)}
                  id={'inputQuantity' + item.id}
                />
                <button
                  className='text-black font-bold outline-none bg-white w-10 border hover:bg-gray-300 transition-all'
                  onClick={(event) => {
                    event.preventDefault();
                    let updatedQuantity = parseInt($('#inputQuantity' + item.id).val()) + 1;
                    handleChangeQuantity(item.id, updatedQuantity);
                    $('#inputQuantity' + item.id).val( updatedQuantity );
                  }}
                >
                  +
                </button>
                </div>
              </span>
            </div>
          );
        })}

      {/* Pagination */}
    </section>
    {itemsShopping.length > 0 ? (
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
      />
    ) : (
      <div className='flex mt-[300px] flex-col justify-center items-center w-full'>
        <RemoveShoppingCartIcon sx={{ fontSize: '100px' , color:'white' }} />
        <h4 className='text-gray-300 text-2xl'>Shopping cart empty</h4>
      </div>
    )}
    </>
  );
}
