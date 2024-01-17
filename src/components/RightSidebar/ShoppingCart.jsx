import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { especifications } from './../../helpers/specifications';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function ShoppingCart(props) {
  const { styles, cart, handleChangeQuantity, deleteFromCart } = props;

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
  }, [cart]); // Removed 'itemsShopping' and 'deleteFromCart' from dependencies

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
            <div key={item.id} className='flex flex-col justify-start m-auto items-center w-full md:w-full h-full md:flex md:flex-row md:justify-around md:m-auto'>
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
              <span className='w-50'>
                <b>Quantity:</b>
                <input
                  type='text'
                  className='text-black font-bold w-6 outline-none'
                  defaultValue={item.quantity}
                  onChange={() => handleChangeQuantity(item.id, event.target)}
                />
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
