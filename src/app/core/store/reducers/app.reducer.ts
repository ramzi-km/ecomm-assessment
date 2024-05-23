import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { cartReducer } from './cart.reducer';

export const appReducer: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  cart: cartReducer,
};
