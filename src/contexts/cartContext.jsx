import { createContext,useContext,useState} from "react";

const CartContext = createContext([])
export const useCartContext = () => useContext(CartContext) // esto ayuda a importa un contexto a los demas componente de manera rapida

export const CartContextProvider =({children})=>{
    // estados y funciones
    const [cart,setCart] = useState([]) //lista del carrito con un array vacio solo al inicio

    const isInCart = (item) =>{
        return cart.find(film => film.id === item.id)
    }

    const addToCart =(item) => {
        if(isInCart(item)){
            (cart.find(element => element.id ===item.id)).cantidades += item.cantidades
        }else{
        setCart([
            ...cart,
            item
        ]) //se arma un nuevo array
        }
    }
    const vaciarCarrito = () => {
        setCart([])
    }

    // const DelItem = (id) => {
    //     const items = cart.filter((product) => product.item.id !==id )
    //     setCart(items)
    // } para impletar mas adelante el borrar item.

    // const precioTotal = () => {
    //     return cart.reduce((acum,i) => acum + i.cantidades*i.item.precio,0)
    // }

    return(
        <CartContext.Provider
        value={{
            cart,
            addToCart,
            vaciarCarrito,
            //DelItem,
            //precioTotal,
        }}
        >
        {children}
        </CartContext.Provider>
    )
}
