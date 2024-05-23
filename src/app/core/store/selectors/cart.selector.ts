import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICartState } from '../state/cart.state';

export const selectCartState = createFeatureSelector<ICartState>('cartState');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);
export const selectTotalItems = createSelector(
  selectCartState,
  (state) => state.totalItems
);
export const selectTotalPrice = createSelector(
  selectCartState,
  (state) => state.totalPrice
);
