import React from 'react'
import SidebarPC from './SidebarPC';
import SidebarMobile from './SidebarMobile';

import { connect } from 'react-redux';

const Sidebar = (props)=> {

  return (
    <aside className=''>
      <SidebarPC session={props.session} initialState={props.initialState} showMenu={props.showMenu} typeMenu={props.typeMenu} functions={props.functions}/> 
          {/* Mobile menu */}
      <SidebarMobile session={props.session} initialState={props.initialState} showMenu={props.showMenu} typeMenu={props.typeMenu} functions={props.functions} />
    </aside>
 
  )
}

const mapStateToProps = ( state )=>{
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(Sidebar);
