import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.API_URL + '/products';

  getAllCategories() {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getAllProducts() {
    return this.http.get<IProduct[]>(`${this.baseUrl}`);
  }

  getProductsInCategory(category: string) {
    return this.http.get<IProduct[]>(`${this.baseUrl}/category/${category}`);
  }
}
