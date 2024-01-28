import React,{ useEffect , useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../Context/authContext';
import { MsgContext } from "./../../Context/messageContext.jsx";


export default function Settings(props) {

  const { session, logOut } = useContext(AuthContext);
  const { useMessage } = useContext(MsgContext);
  const username = session?.data?.user?.username || ""; // Provide a default value if any part is undefined

  useEffect(() => {
    return () => {
      if (session.length === 0) {
        useMessage(`Logged out`, 'error', 2000, 'top', 'center');
      }
    };
  }, [ session ]);

  return (
    <>
      <nav className='fixed hidden md:block top-0 w-full bg-gray-700 bg-opacity-60 border-b border-gray-600'>
        {/* For PC */}
        <ul className='mt-36 flex flex-row w-full items-center'>
          <div className='flex flex-row items-center sm:justify-center w-full'>
            <li className='ml-2 w-24 h-24 flex flex-col items-center h-full justify-center relative cursor-pointer'>
              <img src={session.picture} className='flex flex-col w-full h-full rounded-full items-center m-auto' alt="" />
            </li>
            <li>{username}</li>
          </div>
          <div className='flex flex-row items-center ml-10 justify-end w-full'>
            <li className='mr-10'>
              <LogoutIcon onClick={logOut} sx={{ fontSize: '50px' }} className='cursor-pointer' />
            </li>
          </div>
        </ul>
      </nav>
      <section></section>
    </>
  );
}