import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

@NgModule({
  declarations: [LoadingScreenComponent],
  imports: [CommonModule],
  exports: [LoadingScreenComponent],
  providers: [ProductService],
})
export class SharedModule {}
