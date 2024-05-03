import { Component, EventEmitter, Input, Output, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {  FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputUiComponent } from '../../../shared/ui-design-system/form/input-ui.component';
import { idAvailableValidator } from '../../../util-form-validators/id-available.validator';
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { FinancialProduct } from '../../../type-database/financial-product.type';
import { ButtonUiComponent } from '../../../shared/ui-design-system/button-ui.component';
import { JsonPipe } from '@angular/common';
import { dateValidator } from '../../../util-form-validators/min-date.validator';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputUiComponent, ButtonUiComponent, JsonPipe],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly financialProductService = inject(FinancialProductsService);

  @Output() formSubmited = new EventEmitter<FinancialProduct>();
  product = input<FinancialProduct>(); //Optional input for detail component
  productForm = this.fb.nonNullable.group({
    id: ['', Validators.required, idAvailableValidator(this.financialProductService)],
    name: ['',[Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    date_release: ['',dateValidator],
    date_revision: [''],
  });

  idTaken = toSignal(this.productForm.controls.id.statusChanges, {initialValue: null});
  dateReleaseChanged = toSignal(this.productForm.controls['date_release'].valueChanges)
  
  constructor() {
    this.productForm.get('date_revision')?.disable();
    effect(() => {
      if(this.product()){
        const {id, name, description, logo, date_release, date_revision}  = this.product()!;
        this.productForm.patchValue({
          id,
          name,
          description,
          logo,
          date_release: new Date(date_release).toISOString().split('T')[0],
          date_revision
        })
        this.productForm.get('id')?.disable(); //Disable id in case of editing
      }
      if (this.dateReleaseChanged()) {
        const releaseDate = new Date(this.productForm.get('date_release')?.getRawValue());
        const oneYearAhead = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate()+1);
        this.productForm.controls['date_revision'].setValue(oneYearAhead.toISOString().split('T')[0])
      }
    })
  }


  reset(){
    this.productForm.reset();
  }

  submit(){
    if(this.productForm.valid){
      const product = this.productForm.getRawValue();
      this.formSubmited.emit(product);
    }
  }


}
