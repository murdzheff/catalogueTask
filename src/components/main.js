import React from 'react'
import Categories from './categories'
import ProductsComponent from './products'

export default function Main() {
  return (
    <div className='mainView'>
        <Categories></Categories>
        <ProductsComponent></ProductsComponent>
    </div>
  )
}
