import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { IProduct } from '../../../types';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule, 
    CommonModule, 
    FormsModule, 
    RatingModule, 
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) { }

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Input() product: IProduct = {
    name: '',
    image: '',
    price: '',
    rating: 0
  };

  @Output() confirm = new EventEmitter<IProduct>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const forbidden = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
      return forbidden ? { hasSpecialCharacter: true} : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    price: ['', [Validators.required]],
    rating: [0, []],
    image: ['', []]
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const { name, price, image, rating } = this.productForm.value;

    this.confirm.emit({
      name: name || '',
      price: price || '',
      image: image || '',
      rating: rating || 0
    
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
