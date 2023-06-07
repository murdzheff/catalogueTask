import React from 'react'
import cart from "../assets/cart.png"
import { useSelector } from 'react-redux';


export default function CartButton(props) {
  const cartState = useSelector(state => state.cart)

  //controls cart modal display
  function handleModal(e) {
    e.preventDefault();
    props.setModal(!props.cartModal)
  }


  return (


    <button onClick={handleModal}>
      {cartState.length ? <div className='bubble'>{cartState.length}</div> : null}
      <img src={cart}></img>
    </button>
  )
}
