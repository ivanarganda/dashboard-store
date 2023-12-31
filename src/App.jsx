import React, { useState } from "react"
import Sidebar from './components/Sidebar/Sidebar';
import Header from "./components/Header/Header";
import Section from "./components/Sections/Section";

// Right sidebar
import RightSidebar from './components/RightSidebar/RightSidebar';
import ShoppingCart from './components/RightSidebar/ShoppingCart';
import Favorites from './components/RightSidebar/Favorites';
import Notifications from './components/RightSidebar/Notifications';

function App() {

  const [ showMenu , setShowMenu ] = useState(false);
  const [ filter , setFilter ] = useState('');
  const [ typeMenu , setTypeMenu ] = useState('');

  const goToHome = ()=>{
    setFilter('');
    setTypeMenu('')
  }

  const openMenu = ( type )=>{

    const styles = {
      'nav':'bg-[#1F1D2B] lg:w-1/2 w-full w-full h-full top-0 right-0 fixed transition-all',
    }

    let menus = {
      'ShoppingCart':<ShoppingCart styles={styles} />,
      'Favorites':<Favorites styles={styles} />,
      'Notifications':<Notifications styles={styles}/>
    }

    setTypeMenu( menus[type] )

  }

  return (
    <div className={`bg-[#262837] min-h-screen w-full`}>
      <Header filter={filter} />
      <Section />
      <Sidebar showMenu={showMenu} functions={[goToHome,openMenu,openMenu,openMenu]} />
      <RightSidebar typeMenu={typeMenu}/>
    </div>
  )
}

export default App;
