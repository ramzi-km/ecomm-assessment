import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../store/selectors/cart.selector';
import { IAppState } from '../../store/state/app.state';
// import * as CartSelectors from '../../store/selectors/cart.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private store: Store<IAppState>) {}

  totalItems$ = this.store.select(CartSelectors.selectTotalItems);
  totalPrice$ = this.store.select(CartSelectors.selectTotalPrice);
  
}
