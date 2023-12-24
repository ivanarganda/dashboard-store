import React from 'react'
import Home from '@mui/icons-material/Home';

export default function Sidebar(props) {

  const { colors } = props;

  return (
    <div className={`bg-[#${colors.dashboard}] fixed left-0 top-0 h-full w-28`}>
        <h1 className={`text-[#${colors.main_title}] text-3xl uppercase font-bold text-center mt-5`}>Logo</h1>
        <ul className='pl-4'>
          <li className={`bg-[#${colors.body}] p-4 rounded-tl-xl rounded-bl-xl`}>
            <a className={`text-[#${colors.main_title}] bg-[#ec7c6a] p-4 flex justify-center`}>
              <Home sx={{ fontSize:30 }} /> 
            </a>
          </li>
        </ul>
    </div> 
  )
}
