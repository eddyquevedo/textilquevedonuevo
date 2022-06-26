import React from 'react'
import { useCartContext } from '../../contexts/cartContext';

const Cart = () => {
  const { cart,vaciarCarrito} = useCartContext() //destructurar cart
  return (
    <div>
        <ul>
        {
          cart.map(item => <li key={item.id}>
          <div className='w-25'>
          <img src={item.img} className='w-25' alt='' />
          </div>
          nombre: {item.title} precio: {item.precio} cantidad:{item.cantidades} unidades
          </li>) // se realiza el mapeo de cart
        }
        </ul>
        <div>
          <button onClick={vaciarCarrito}>Vaciar carrito </button>
        </div>
        {/* <p>
          El precio total de los productos es {precioTotal()}
        </p> */}
    </div>
  )
}

export default Cart;