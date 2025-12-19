import { useContext, useRef } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartContext from '../store/cartContext';

export default function Header() {
  const cart = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartQuantity = cart.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Delicious food logo" />
        <h1>REACTFOOD</h1>
      </div>
      <Button textOnly onClick={handleShowCart}>Cart ({cartQuantity})</Button>
    </header>
  )
}
