import { RouterReducerState } from '@ngrx/router-store';
import { ICartState, initialCartState } from './cart.state';

export interface IAppState {
  router?: RouterReducerState;
  cart: ICartState;
}

export const initialAppState: IAppState = {
  cart: initialCartState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
