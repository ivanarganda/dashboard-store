import React from 'react'
import SidebarPC from './SidebarPC';
import SidebarMobile from './SidebarMobile';

export default function Sidebar(props) {

  return (
    <aside>
      <SidebarPC showMenu={props.showMenu} functions={props.functions}/> 
          {/* Mobile menu */}
      <SidebarMobile showMenu={props.showMenu} functions={props.functions} />
    </aside>
 
  )
}
