import React, { useContext } from 'react'
import SidebarPC from './SidebarPC';
import SidebarMobile from './SidebarMobile';

const Sidebar = (props)=> {

  return (
    <aside className=''>
      <SidebarPC initialState={props.initialState} showMenu={props.showMenu} typeMenu={props.typeMenu} functions={props.functions}/> 
          {/* Mobile menu */}
      <SidebarMobile initialState={props.initialState} showMenu={props.showMenu} typeMenu={props.typeMenu} functions={props.functions} />
    </aside>
 
  )
}

export default React.memo(Sidebar);
