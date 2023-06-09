import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import './App.css';
import Cart from "./components/common/Cart/Cart";
import { useState } from 'react';

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toogleVisibilityCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <>
      <Navbar updateCartVisible={toogleVisibilityCart}/>

      <main>
        <Outlet/>
      </main>

      <Cart isVisible={isCartVisible} />
    </>
  );
}

export default App;
