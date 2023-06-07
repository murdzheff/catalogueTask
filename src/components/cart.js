import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../slices/cartSlice';

export default function Cart(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)


    //gets the total items in cart for the bubble 
    function getTotal(items) {
        return items.reduce((acc, item) => acc + item.price, 0);
    }

    //controls whether the cart modal is shown or not
    function handleModal(e) {
        e.preventDefault();
        props.setCartModal(!props.cartModal)
    }

    //function to dispatch a remove action to the store so user can remove items from cart
    function handleRemove(product) {
        dispatch(removeProduct(product.id))
    }

    return (
        <div className='cart'>
            <button className='closeCart' onClick={handleModal}>X</button>
            {cart.length ? <div>
                <h3>Your cart</h3>
                <ol>
                    {cart.map(item => (
                        <li>
                            <p>{item.title}</p>
                            <p>{item.price}</p>
                            <button
                                onClick={() => { handleRemove(item) }}
                            >Remove</button>
                        </li>
                    ))}
                </ol>
                <div>Total: ${getTotal(cart)}</div>
            </div> : <p>No items in cart</p>}
        </div>
    )
}
