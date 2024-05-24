import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Subject, takeUntil } from 'rxjs';
import { ICartItem } from 'src/app/core/interfaces/cartItem.interface';
import * as CartSelectors from '../../../core/store/selectors/cart.selector';
import * as CartActions from '../../../core/store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  private ngUnsubscribe$ = new Subject<void>();
  cartItems: ReadonlyArray<ICartItem> = [];
  cartLoading = false;
  totalPrice$ = this.store.select(CartSelectors.selectTotalPrice);

  ngOnInit(): void {
    this.cartLoading = true;
    this.store
      .select(CartSelectors.selectCartItems)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (items) => {
          this.cartItems = items;
          this.cartLoading = false;
        },
        error: (errMessage) => {
          console.log(errMessage);
          this.cartLoading = false;
        },
      });
  }

  incQuantity(item: ICartItem) {
    if (item.quantity < 11) {
      this.store.dispatch(
        CartActions.incItemQuantity({ product: item.product })
      );
    }
  }
  decQuantity(item: ICartItem) {
    if (item.quantity > 1) {
      this.store.dispatch(
        CartActions.decItemQuantity({ product: item.product })
      );
    }
  }

  removeFromCart(item: ICartItem) {
    this.store.dispatch(CartActions.removeFromCart({ removingItem: item }));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
