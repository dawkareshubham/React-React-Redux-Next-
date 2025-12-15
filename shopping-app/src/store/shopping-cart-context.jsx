import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updatedItemQuatity: () => {},
});

function shoppingCartReducer(state, action) {
  
  if (action.type === 'ADD_ITEM') {
    const id = action.payload;
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === id);
      updatedItems.push({
        id: id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const { productId, amount } = action.payload;
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
}

export default function CartContextProvider({ children }) {

  const [ shoppingCartState, shoppingCartDispatch ] = useReducer(shoppingCartReducer, { items: [] });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: { productId, amount }
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updatedItemQuatity: handleUpdateCartItemQuantity,
  };

  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>;
}