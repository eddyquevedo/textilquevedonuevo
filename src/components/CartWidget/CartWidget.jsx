import Logo from "../CartWidget/coser.svg";
import {Link} from 'react-router-dom'

function CartWidget () {
    return (
    <div>
    <img className="m-1 " src={Logo}height={55} width={50} alt =''/>
    <Link to='/cart'>
    <button className='btn btn-outline-primary'>
    Carrito
    </button>
    </Link>
    </div>
    )
  }


export default CartWidget