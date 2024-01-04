import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

export default function RightSidebar( props ) {

  const { typeMenu , showMenu , styles , closeMenu } = props;

  return (
    
      <aside className='bg-white-400 relative'>
        <nav className={`${showMenu ? styles : ''}`}>
          <Backdrop sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' , zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showMenu}>
            <span className='fixed right-2/2 top-10 text-white bg-gray-800 rounded-full p-3 cursor-pointer' onClick={closeMenu}>
              <ClearIcon sx={{fontSize:'50px'}} />
            </span>
            { typeMenu }
          </Backdrop>
        </nav>
      </aside>
    
    
  )
}
