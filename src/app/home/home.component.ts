import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct, IProducts } from '../../types';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductComponent, CommonModule, PaginatorModule]
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }

  products: IProduct[] = [];

  totalRecords: number = 0;

  rows: number = 5;

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe((products: IProducts) => {
        this.products = products.items;
        this.totalRecords = products.total;
    });      
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
