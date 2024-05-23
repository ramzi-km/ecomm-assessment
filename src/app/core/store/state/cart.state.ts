import { ICartItem } from '../../interfaces/cartItem.interface';

export interface ICartState {
  items: ReadonlyArray<ICartItem>;
  totalPrice: number;
  totalItems: number;
}

export const initialCartState: ICartState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};
