import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { especifications } from './../../helpers/specifications';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function ShoppingCart(props) {
  const { styles, cart, handleChangeQuantity, deleteFromCart } = props;
  const [ currentQuantity , setCurrentQuantity ] = useState(0);
  const [itemsShopping, setItemsShopping] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    <section className={`${styles}`}>
      {itemsShopping
        .slice((currentPage - 1) * 3, (currentPage - 1) * 3 + 3)
        .map((item) => {
          return (
            <div key={item.id} className='flex flex-col justify-center md:items-center w- md:w-full h-full md:flex md:flex-row md:justify-around md:m-auto'>
              <div className='w-40 relative'>
                <img className='w-20 h-20 sm:w-30 sm:h-30  rounded-full' src={item.url} alt='image' />
                <span
                  onClick={() => {
                    handleDeleteFromCart(item.id);
                  }}
                  className='absolute top-0 right-1/4 p-1 rounded-2xl bg-gray-400 cursor-pointer hover:text-gray-600 hover:bg-white transition-all'
                >
                  <ClearOutlinedIcon color='white' />
                </span>
              </div>
              <form className='w-40'>
                <h4>{item.name}</h4>
                <label>
                  <span>
                    <details className='transition-all'>
                      <ul>
                        {especifications[item.category].map((l, idx) => {
                          return <li key={idx}>{l}: {item.specifications[l]}</li>;
                        })}
                      </ul>
                    </details>
                  </span>
                </label>
              </form>
              <span className='w-50 flex flex-col justify-center'>
                <b>Quantity:</b>
                <div className='w-full flex flex-row '>
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
              <div>${item.specifications.price}</div>
            </div>
          );
        })}

      {/* Pagination */}

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
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <RemoveShoppingCartIcon sx={{ fontSize: '100px' }} />
          <h4 className='text-gray-300 text-2xl'>Shopping cart empty</h4>
        </div>
      )}
    </section>
  );
}
