import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { IAppState } from 'src/app/core/store/state/app.state';
import { ProductService } from 'src/app/shared/services/product.service';
import * as CartActions from '../../../core/store/actions/cart.actions';
import * as CartSelectors from '../../../core/store/selectors/cart.selector';
import { ICartItem } from 'src/app/core/interfaces/cartItem.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private store: Store<IAppState>
  ) {}

  private ngUnsubscribe$ = new Subject<void>();

  productId!: string | null;
  product!: IProduct;
  productLoading = false;
  Math = Math;
  cartItems: ReadonlyArray<ICartItem> = [];

  ngOnInit() {
    this.productLoading = true;
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productService
      .getProductById(this.productId!)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res) => {
          if (!res) {
            this.router.navigate(['/home']);
          }
          this.product = res;
          this.productLoading = false;
        },
        error: (errMessage) => {
          console.log(errMessage);
          this.productLoading = false;
          this.router.navigate(['/home']);
        },
      });
    this.store
      .select(CartSelectors.selectCartItems)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (items) => {
          this.cartItems = items;
        },
      });
  }

  addToCart() {
    const existInCart = this.cartItems.some((item) => {
      return item.product.id == this.product.id;
    });
    if (!existInCart) {
      this.store.dispatch(CartActions.addToCart({ product: this.product! }));
    }
    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
