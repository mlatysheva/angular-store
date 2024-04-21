import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct, IProducts } from '../../types';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule]
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }

  products: IProduct[] = [];

  totalRecords: number = 0;

  rows: number = 5;

  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;

  selectedProduct: IProduct = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0
  };

  toggleEditPopup(product: IProduct) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: IProduct) {
    if (!product.id) return;
    this.deleteProduct(product.id);
  }

  onConfirmEdit(product: IProduct) {
    if (!this.selectedProduct.id) return;

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: IProduct) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

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

  addProduct(product: IProduct) {
    this.productsService.addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  editProduct(product: IProduct, id: number) {
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
