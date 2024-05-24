import { createReducer, on } from '@ngrx/store';
import { initialCartState } from '../state/cart.state';
import * as cartActions from '../actions/cart.actions';

export const cartReducer = createReducer(
  initialCartState,
  on(cartActions.addToCart, (state, { product }) => ({
    ...state,
    items: [...state.items, { product, quantity: 1 }],
    totalPrice: state.totalPrice + product.price,
    totalItems: state.totalItems + 1,
  })),
  on(cartActions.removeFromCart, (state, { product }) => ({
    ...state,
    items: state.items.filter((item) => item.product.id !== product.id),
    totalPrice: state.totalPrice - product.price,
    totalItems: state.totalItems - 1,
  })),
  on(cartActions.incItemQuantity, (state, { product }) => ({
    ...state,
    items: state.items.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ),
    totalPrice: state.totalPrice + product.price,
  })),
  on(cartActions.decItemQuantity, (state, { product }) => ({
    ...state,
    items: state.items.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ),
    totalPrice: state.totalPrice - product.price,
  }))
);
