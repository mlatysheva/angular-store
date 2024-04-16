import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: IProduct;
  @Output() outputProduct: EventEmitter<IProduct> = new EventEmitter<IProduct>();

}