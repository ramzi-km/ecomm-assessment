import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private router: Router) {}

  @ViewChild('productListSection') productListSection!: ElementRef;

  private ngUnsubscribe$ = new Subject<void>();
  categories: string[] = [];
  selectedCategory = '';
  products: IProduct[] = [];
  productsLoading = false;
  searchText = '';
  submittedSearchText = '';

  ngOnInit(): void {
    this.productsLoading = true;
    this.productService
      .getAllCategories()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (errMessage) => {
          console.log(errMessage);
        },
      });

    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res) => {
          this.products = res;
          this.productsLoading = false;
        },
        error: (errMessage) => {
          this.productsLoading = false;
          console.log(errMessage);
        },
      });
  }

  scrollToSection(): void {
    this.productListSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
  searchSubmit() {
    this.submittedSearchText = this.searchText;
  }

  changeCategory(category: string) {
    this.selectedCategory = category;
    this.products = [];
    this.productsLoading = true;
    if (this.selectedCategory) {
      this.productService
        .getProductsInCategory(this.selectedCategory)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res) => {
            this.products = res;
            this.productsLoading = false;
          },
          error: (errMessage) => {
            this.productsLoading = false;
            console.log(errMessage);
          },
        });
    } else {
      this.productService
        .getAllProducts()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res) => {
            this.products = res;
            this.productsLoading = false;
          },
          error: (errMessage) => {
            this.productsLoading = false;
            console.log(errMessage);
          },
        });
    }
  }

  navigateTo(productId: number) {
    this.router.navigate(['/products/' + productId]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
