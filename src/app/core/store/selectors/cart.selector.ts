import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const selectCartState = (state: IAppState) => state.cart;

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
