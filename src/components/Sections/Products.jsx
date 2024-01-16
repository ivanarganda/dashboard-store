import React, { useEffect } from 'react';


export const Products = (props) => {

  let { loading , initialState , products , addToCart , addToFavorites , deleteFromFavorites , format } = props;

  return (
    <section className='mt-20 pt-20 pb-10 lg:pl-20 xl:pl-10 grid md:grid-cols-2 xl:pl-60 lg:grid-cols-2 xl:grid-cols-3'>
      
      {
      loading ? <span className="w-full min-h-screen flex flex-col m-80 text-5xl text-gray-300">Loading...</span> :
      products?.map((p, idx) => {

        return  (
          <article className='flex flex-col justify-center items-center mt-20' key={idx}>
            <figure className='bg-gray-200 bg-opacity-10 w-80 h-80 relative flex flex-col justify-center items-center text-gray-400 rounded-xl'>
              <img src={p.url} className='w-40 h-40 rounded-full absolute -top-14 border border-[#bbb]' alt="" />
              <figcaption className='w-full flex flex-col items-center justify-center mt-20'>
                <div>
                  <p className='text-gray-100'>{p.name}</p>
                  <p className='text-white'>{`${p.specifications.price}${format.currentLanguage.currency}`}</p>
                </div>
                <div className='flex flex-row justify-around w-full mt-10'>
                     <button className='bg-[#262837] p-2 rounded-md text-white hover:bg-[#4B4B4B] transition-all' onClick={() => addToCart(p.id)}>Add to cart</button>
                  {
                    initialState.favorites.find((index)=>index.id === p.id ) ? 
                      <button className='bg-[#ec7c6a] p-2 rounded-md text-white hover:bg-[#4B4B4B] transition-all' onClick={() => { deleteFromFavorites(p.id); }}>Delete from favorites</button> 
                      : 
                      <button className='bg-[#262837] p-2 rounded-md text-white hover:bg-[#4B4B4B] transition-all' onClick={() => { addToFavorites(p.id); }}>Add to favorites</button>
                  }
                </div>
              </figcaption>
            </figure>
          </article>
        );
      })}
    </section>
  );
};
