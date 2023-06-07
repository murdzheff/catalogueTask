import { useState } from 'react';
import Header from './components/header';
import Main from './components/main';
import "./main.scss"
import Cart from './components/cart';

function App() {
  const [cartModal, setCartModal] = useState(false)

  return (
    <>
    {cartModal ? <Cart cartModal={cartModal} setCartModal={setCartModal} ></Cart> : null}
    <Header cartModal={cartModal} setCartModal={setCartModal}></Header>
    <Main></Main>
    </>
  );
}

export default App;
