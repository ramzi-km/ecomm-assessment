import { createReducer, on } from '@ngrx/store';
import { initialCartState } from '../state/cart.state';
import * as cartActions from '../actions/cart.actions';

export const cartReducer = createReducer(
  initialCartState,
  on(cartActions.addToCart, (state, { product }) => ({
    items: [...state.items, { product, quantity: 1 }],
    totalPrice: state.totalPrice + product.price,
    totalItems: state.totalItems++,
  })),
  on(cartActions.removeFromCart, (state, { product }) => ({
    items: state.items.filter((item) => item.product.id !== product.id),
    totalPrice: state.totalPrice - product.price,
    totalItems: state.totalItems--,
  })),
  on(cartActions.incItemQuantity, (state, { product }) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.product.id == product.id) {
        item.quantity++;
      }
      return item;
    }),
    totalPrice: state.totalPrice + product.price,
  })),
  on(cartActions.decItemQuantity, (state, { product }) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.product.id == product.id) {
        item.quantity--;
      }
      return item;
    }),
    totalPrice: state.totalPrice - product.price,
  }))
);
