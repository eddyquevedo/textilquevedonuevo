import React from 'react'
import { useCartContext } from '../../contexts/cartContext';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
const Cart = () => {
  const { cart,vaciarCarrito,removeItem,totalPrecio} = useCartContext() //destructurar cart
  return (
    <div>
        <ul>
        {
          cart.map(item => <li key={item.id}>
          <div className='w-25'>
          <img src={item.img} className='w-25' alt='' />
          </div>
          nombre: {item.title} precio: {item.precio} cantidad:{item.cantidades} unidades
          Total:  ${item.cantidades * item.precio}
          <button type="button" onClick={()=>removeItem(item.id)}className="font-medium  text-green-600 hover:text-indigo-500">Eliminar</button>
          </li>) // se realiza el mapeo de cart
        }
        </ul>

        <div>
          <p> El precio total de los productos es {totalPrecio()}</p>
          <Button variant="danger" onClick={vaciarCarrito}>Vaciar carrito </Button>
          <Link to="/">
            <Button variant="success">Continuar Compra</Button>
          </Link>
        </div>
    </div>
  )
}

export default Cart;