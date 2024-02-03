import React, { useCallback, useContext } from 'react';
import SearchForm from './SearchForm';
import './Header.css';
import useNavbar from './../../Hooks/estate/useNavbar';
import { useDate } from './../../Hooks/estate/useDate';

import { AuthContext } from './../../Context/authContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar(props) {
  let { initialState, handleFilter } = props;
  const [currentDate] = useDate();

  const session = useContext(AuthContext);

  console.log( session.session );

  const navbarCategories = useNavbar('categories');

  return (
    <>
      <main className='lg:pl-28 bg-[#1F1D2B] fixed w-full pt-0 top-0 pb-4 z-10 flex flex-col h-25 shadow-xl'>
        <nav className='w-full flex flex-col justify-center lg:flex lg:flex-row lg:justify-between items-center'>
          <div className='flex flex-col w-full lg:w-1/2 lg:flex-row lg:justify-center m-auto items-center'>
            <article className='flex flex-col w-full justify-center items-center'>
              { session.session ? (
                <div className='w- flex flex-row-reverse justify-center gap-2 m-auto items-center'>
                  <h1 className='text-gray-300 w-full m-auto flex flex-row justify-center items-center text-2xl'>
                    {session?.session?.data?.user?.username}
                  </h1>
                  {session.session.picture ? (
                    <img
                      src={session?.session?.picture}
                      className='rounded-full mt-2 h-full w-20'
                      alt=''
                    />
                  ) : (
                    <>
                    <AccountCircleIcon
                      className='h-full mt-2'
                      sx={{ fontSize: '80px', color: 'white' }}
                    />
                    </>
                  )}
                </div>
              ) : (
                <div className='w-full flex flex-col justify-center m-auto items-center'>
                  <h1 className='text-gray-300 text-2xl'>DASHBOARD STORE</h1>
                  <p className='text-gray-400'>{currentDate}</p>
                </div>
              )}
            </article>
          </div>
          <div className='flex flex-col sm:flex-row w-full min-w-fit gap-2 sm:gap-20 pl-5 pr-5 sm:justify-around items-center'>
            <article className='w-full sm:w-1/2 m-auto flex flex-row items-center justify-center'>
              <select
                className='bg-gray-100 active:bg-gray-300 w-full bg-opacity-50 p-1 rounded outline-none transition-all'
                onChange={(event) => {
                  handleFilter('category', event.target.value);
                }}
              >
                <option className='' value={''}>
                  Choose category
                </option>
                {navbarCategories[0]?.map((item, idx) => {
                  let style = 'hover:text-[#ec7c6a]';
                  if (initialState.q !== '' && initialState.q === item.item) {
                    style = 'text-[#ec7c6a]';
                  }
                  return (
                    <option
                      key={idx}
                      value={item.item}
                      className={`${style} font-bold cursor-pointer transition-all`}
                    >
                      {item.item}
                    </option>
                  );
                })}
              </select>
            </article>
            <article className='w-full sm:w-1/2 m-auto flex flex-row items-center justify-center'>
              <SearchForm initialState={initialState} handleFilter={handleFilter} />
            </article>
          </div>
        </nav>
      </main>
    </>
  );
}
