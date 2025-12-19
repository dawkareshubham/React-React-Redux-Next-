import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
})

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const newItem = action.payload;
    const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
    const updatedItems = [...state.items];
    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...newItem, quantity: 1 });
    }
    return {
      ...state,
      items: updatedItems
    }
  }

  if (action.type === 'REMOVE_ITEM') {
    const id = action.payload;
    const existingItemIndex = state.items.findIndex(item => item.id === id);
    const existingCartItem = state.items[existingItemIndex];
    const updatedItems = [...state.items]

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const  [ cartState, dispatch ] = useReducer(cartReducer, { items: []} );

  function addItem(item) {
    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });
  }

  function removeItem(id) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
  }

  const cartCtx = {
    items: cartState.items,
    addItem,
    removeItem
  };

  return <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
}

export default CartContext;
