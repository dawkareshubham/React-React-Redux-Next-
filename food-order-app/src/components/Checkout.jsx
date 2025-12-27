import { useContext, useActionState } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/cartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function Checkout() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

  const totalPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, formData) {
    const userData = Object.fromEntries(formData.entries());

    await sendRequest(JSON.stringify({
      order: {
        customer: userData,
        items: cartCtx.items
      }
    }));
  }

  const [ formState, formAction, isSending ] = useActionState(checkoutAction, null)

  let actions = (<>
    <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
    <Button >Submit Order</Button>
  </>);

  if (isSending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p className='modal-actions'>
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }
  
  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
      
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className='control-row'>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  )
}
