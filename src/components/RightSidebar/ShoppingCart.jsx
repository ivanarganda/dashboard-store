import React, { useEffect , useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { especifications } from './../../helpers/specifications';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function ShoppingCart( props ) {

  const { styles , cart } = props;
  
  const [ itemsShopping , setItemsShopping ] = useState([]);

  const [ currentPage , setCurrentPage ] = useState(1);

  const loadProductsCart = ()=>{
        return cart;
  }

  const handlePage = (event, value)=>{
      console.log( value );
      setCurrentPage( value );
  }

  useEffect(()=>{
    setItemsShopping( loadProductsCart() )
  },[ itemsShopping ])

  return (
    
      <section className={`${styles}`}>
        {
          itemsShopping.slice( (currentPage - 1) * 3 , ( (currentPage - 1) * 3 ) + 3 ).map(( item ) =>{
              return (
                <div key={item.id} className='flex flex-col justify-start m-auto items-center w-full md:w-full h-full md:flex md:flex-row md:justify-around md:m-auto'>
                    <div className='w-40'>
                      <img className='w-20 h-20 sm:w-30 sm:h-30  rounded-full' src={item.url} alt="image" />
                    </div>
                    <form className='w-40'>
                        <h4>{item.name}</h4>
                        <label> 
                          <span>
                              <details className='transition-all'>
                                  <ul>
                                    {
                                      especifications[item.category].map(( l , idx )=>{
                                          return <li key={idx}>{l} : { item.specifications[l] }</li>
                                      })
                                    }
                                  </ul>
                              </details>
                          </span> 
                        </label>
                    </form>
                    <span className='w-50'><b>Quantity:</b><input type='text' className='text-black font-bold w-6 outline-none' defaultValue={item.quantity} /></span>
                    <div>
                      ${item.specifications.price}
                    </div>
                    
              </div>
              )
          })
        }

        {/* Pagination */}

        { itemsShopping.length > 0 ? <Pagination 
          onChange={handlePage}
          page={currentPage}
          showFirstButton 
          showLastButton 
          sx={{marginTop:'3rem',color:'white',background:'white',borderRadius:'0.4rem 0.4rem 0.4rem 0.4rem',width:'50%',minWidth:'350px',margin:'auto'}} count={Math.ceil(itemsShopping.length / 3)} color='primary'
          size="large"/> : 
        
          ( <div className='flex flex-col justify-center items-center w-full h-full'>
              <RemoveShoppingCartIcon sx={{fontSize:'100px'}}/>
              <h4 className='text-gray-300 text-2xl'>Shopping cart empty</h4>
          </div> )}
      </section>
    
  )
}
