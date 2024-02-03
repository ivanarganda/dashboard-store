import React,{ useEffect , useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../Context/authContext';
import { MsgContext } from "./../../Context/messageContext.jsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
      <nav className='fixed w-full h-24 shadow-md bg-gray-400 top-44 sm:top-32 md:top-32 lg:top-24'>
        {/* For PC */}
        <ul className='flex relative h-full flex-row justify-center mt-1 items-center'>
          <li className='list-none ml-3 cursor-pointer fixed left-28'>
            { session.picture ? <img src={  session.picture } className='rounded-full h-full w-20' alt="" /> : <AccountCircleIcon className='h-full' sx={{fontSize:'80px',color:'white'}}/> }
          </li>
          <li className='list-none fixed left-52 font-bold'>{username}</li>
          <li className='list-none mr-10 fixed right-0'>
            <LogoutIcon onClick={logOut} sx={{ fontSize: '50px' , color:'black' }} className='cursor-pointer hover:text-white transition-all' />
          </li>
        </ul>
      </nav>
      <section></section>
    </>
  );
}