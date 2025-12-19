import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/cartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Checkout() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {
      name: formData.get('full-name'),
      email: formData.get('email'),
      street: formData.get('street'),
      "postal-code": formData.get('postal-code'),
      city: formData.get('city'),
    };

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        order: {
          customer: userData,
          items: cartCtx.items
        }
      })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
      return response.json();
    }).then(data => {
      console.log('Order submitted successfully:', data);
      cartCtx.clearCart();
      userProgressCtx.hideCheckout();
    }).catch(error => {
      console.error('Error submitting order:', error);
    });
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
      
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className='control-row'>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className='modal-actions'>
          <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
          <Button >Submit Order</Button>
        </p>
      </form>
    </Modal>
  )
}
