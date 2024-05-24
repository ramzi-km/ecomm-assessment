import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.interface';
import { ICartItem } from '../../interfaces/cartItem.interface';

export const addToCart = createAction(
  '[ProductDetails Component] addToCart',
  props<{ product: Readonly<IProduct> }>()
);

export const removeFromCart = createAction(
  '[Cart Component] removeFromCart',
  props<{ removingItem: Readonly<ICartItem> }>()
);

export const incItemQuantity = createAction(
  '[Cart Component] incQuantity',
  props<{ product: Readonly<IProduct> }>()
);

export const decItemQuantity = createAction(
  '[Cart Component] decQuantity',
  props<{ product: Readonly<IProduct> }>()
);
