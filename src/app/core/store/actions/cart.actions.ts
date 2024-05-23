import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.interface';

export const addToCart = createAction(
  '[ProductDetails Component] addToCart',
  props<{ product: Readonly<IProduct> }>()
);

export const removeFromCart = createAction(
  '[Cart Component] removeFromCart',
  props<{ product: Readonly<IProduct> }>()
);

export const incItemQuantity = createAction(
  '[Cart Component] removeFromCart',
  props<{ product: Readonly<IProduct> }>()
);

export const decItemQuantity = createAction(
  '[Cart Component] removeFromCart',
  props<{ product: Readonly<IProduct> }>()
);
