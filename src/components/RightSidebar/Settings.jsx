import React,{ useEffect , useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../Context/authContext';
import { MsgContext } from "./../../Context/messageContext.jsx";


export default function Settings({}) {

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
      <nav className='fixed flex flex-row w-full bg-gray-700 justify-center items-center top-36'>
        {/* For PC */}
          <li className='ml-2 h-full cursor-pointer'>
            <img src={session.picture} className='rounded-full' alt="" />
          </li>
          <li>{username}</li>
          <li className='mr-10'>
            <LogoutIcon onClick={logOut} sx={{ fontSize: '50px' }} className='cursor-pointer' />
          </li>
      </nav>
      <section></section>
    </>
  );
}