
import React, {useState, useContext} from 'react';
import toast from "react-hot-toast";
export const CartContex = React.createContext([]);

export const useCartContext = ()=> useContext(CartContex);

const CartProvider =({children})=>{

    const [cart,setCart]= useState([]);

    const addItem = (item,quantity)=>{
        if(isInCart(item.id)){
            setCart(cart.map(product =>{
                return product.id === item.id ? { ...product,quantity: product.quantity + quantity} : product
            }));
        } else{
            setCart([...cart, { ...item,quantity}]);
        }
    }

const totalPrice = ()=>{
    return cart.reduce((prev,act)=> prev + act.quantity * act.price,0);
}

const totalItems = () => cart.reduce((acumulador,productoactual) => acumulador + productoactual.quantity,0);

const clearCart =()=> setCart([]);

const isInCart =(id)=>cart.find(product => product.id === id) ? true: false;

const removeItem = (id) =>setCart(cart.filter(product => product.id !== id),
toast.error(`Eliminaste los productos`,{
    position:"top-right",
    duration: 4000,
    style: {
        borderRadius: '7px',
        background: '  #e5e8e8 ',
        color: 'black',  
    },
} ));


    return(
        <CartContex.Provider value={{
            clearCart,
            isInCart,
            removeItem,
            addItem,
            totalPrice,
            totalItems,
            cart
        }}>
            {children}
        </CartContex.Provider>
    )
}
export default CartProvider;

