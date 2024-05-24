import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('productListSection') productListSection!: ElementRef;

  scrollToSection(): void {
    this.productListSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
  searchSubmit() {
    console.log('hsd');
  }
}
