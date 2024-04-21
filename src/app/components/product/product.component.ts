import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IProduct } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any;

  @Input() product!: IProduct;
  @Output() edit: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() delete: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  trancateName(name: string) {
    return name.length > 16 ? name.substring(0, 16) + '...' : name;
  }

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }
}
