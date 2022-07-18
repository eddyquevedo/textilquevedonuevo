import {React,useState} from 'react'
import { useCartContext } from '../../contexts/cartContext';
import {Link} from 'react-router-dom';
import {Container,Button} from 'react-bootstrap';
import {addDoc,collection, getFirestore,documentId,getDocs,query,where,writeBatch} from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
const Cart = () => {
  const {cart,vaciarCarrito,removeItem,totalPrecio} = useCartContext() //destructurar cart
  const [guardar, setGuardar] = useState([]);

  async function generarOrden(e){
    e.preventDefault()
    let orden = {};
    orden.buyer ={
      name:'Eddy Quevedo',
      email:'eddyyosimar@gmail.com',
      phone:'1173612091'
    }

    orden.total = totalPrecio();
    //Generar una orden
    orden.films = cart.map((cartItem) => {
      const id = cartItem.id;
      const nombre = cartItem.title;
      const cantidadTotal = cartItem.cantidades;
      const precio = cartItem.precio*cartItem.cantidades;
      return{id,nombre,precio,cantidadTotal};
    })
    //Insertar stock
    const db = getFirestore()
    const orderCollection = collection(db,'orders');
    addDoc(orderCollection,orden)
    .then( (res) => setGuardar(res.id));


  //Actualizar stock (no es obligatorio)
  const queryCollectionStock = collection(db, 'films')
  const queryActualizarStock = await query (
      queryCollectionStock,
      where(documentId(),"in",cart.map((it) => it.id))
    );

    const batch = writeBatch(db)

    await getDocs(queryActualizarStock)
      .then((resp) => resp.docs.forEach((res) => batch.update(res.ref, {
            stock:res.data().stock - cart.find((item) => item.id === res.id).cantidades
          })
        )
      )
      .finally(() => vaciarCarrito())
    batch.commit();
  }

  return (
    <Container>
        <ul className='mt-5'>
        {
        cart.map(item =>
          <div key={item.id}>
          <div className='w-10'>
          <img src={item.img} className='w-25' alt='.' />
          </div>
          <div>Nombre: {item.title}</div>
          <div>Precio unitario: {item.precio} pesos </div>
          <div>Cantidad: {item.cantidades} cantidades.</div>
          <div>Stock:{item.stock} disponible.</div>
          Subtotal:  ${item.cantidades * item.precio}
          <button type="button" onClick={()=>removeItem(item.id)} className="font-medium  text-green-600 hover:text-indigo-500">Eliminar</button>
            <div>
            </div>
          </div>
          ) // se realiza el mapeo de cart
        }
        </ul>
        <div>
            <div> El precio total de los productos es ${totalPrecio()}</div>
            <Button variant="danger" onClick={vaciarCarrito}>Vaciar carrito total </Button>
            <Button variant="btn btn-outline-primary" onClick={generarOrden}>Terminar Compra</Button>
        </div>
        <div>
            <div className="bg-gray-200 rounded p-4 m-2"> Su codigo de compra es: {guardar} </div>
          <Link to="/">
            <Button variant="success">Seguir comprando </Button>
          </Link>
        </div>
    </Container>
  )
}
export default Cart;