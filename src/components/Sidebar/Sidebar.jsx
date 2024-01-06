import React from 'react'
import SidebarPC from './SidebarPC';
import SidebarMobile from './SidebarMobile';

export default function Sidebar(props) {

  console.log( props );

  return (
    <aside className=''>
      <SidebarPC initialState={props.initialState} showMenu={props.showMenu} typeMenu={props.typeMenu} functions={props.functions}/> 
          {/* Mobile menu */}
      <SidebarMobile initialState={props.initialState} showMenu={props.showMenu} typeMenu={props.typeMenu} functions={props.functions} />
    </aside>
 
  )
}
