import React from 'react'
import CartButton from './cartButton'

export default function Header(props) {
    console.log(props)
    return (
        <div className='myHeader'>
            <CartButton cartModal={props.cartModal} setModal={props.setCartModal}></CartButton>
        </div>
    )
}
