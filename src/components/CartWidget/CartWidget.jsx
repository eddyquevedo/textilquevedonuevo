import {Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useCartContext } from '../../contexts/cartContext';
import Cart from '../Cart/Cart';

function CartWidget () {
  const {cart} = useCartContext()

  return (
    <Container>
      {
        cart.length === 0 ?
        <div className="d-flex justify-content-center flex-column align-items-center mt-5">
          <h2 className='text-center'>El carrito esta Vacío </h2>
          <Link to="/">
            <Button variant="danger">Ir al Inicio</Button>
          </Link>
        </div> :
          <div className="mt-5">
          <h1 className='text-center'>Carrito final de Compras</h1>
          <Cart/>
          </div>
      }
    </Container>
  )
  }

export default CartWidget;