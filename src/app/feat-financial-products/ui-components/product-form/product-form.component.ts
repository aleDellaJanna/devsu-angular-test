import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputUiComponent } from '../../../shared/ui-design-system/form/input-ui.component';
import { idAvailableValidator } from '../../../util-form-validators/id-available.validator';
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { FinancialProduct } from '../../../type-database/financial-product.type';
import { ButtonUiComponent } from '../../../shared/ui-design-system/button-ui.component';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputUiComponent, ButtonUiComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private financialProductService = inject(FinancialProductsService)
  productForm = this.fb.nonNullable.group({
    id: ['', Validators.required, idAvailableValidator(this.financialProductService)],
    name: ['', [Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    date_release: ['', this.dateReleaseValidator],
    date_revision: [''],
  });


  idTaken = toSignal(this.productForm.controls.id.statusChanges);
  dateReleaseChanged = toSignal(this.productForm.controls.date_release.valueChanges)
  
  constructor() {
    this.productForm.get('date_revision')?.disable()
    effect(() => {
      if (this.dateReleaseChanged()) {
        console.log(this.dateReleaseChanged())
        const releaseDate = new Date(this.productForm.get('date_release')?.getRawValue());
        const oneYearAhead = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate()+1);
        this.productForm.controls.date_revision.setValue(oneYearAhead.toISOString().split('T')[0])

      }
    })
  }
  dateReleaseValidator(control: FormControl) {
    const releaseDate = new Date(control.value);
    const today = new Date();
    return releaseDate > today ? null : { invalidReleaseDate: true };
  }


  reset(){
    this.productForm.reset();
  }

  submit(){
    this.financialProductService.createProduct(this.productForm.getRawValue() as FinancialProduct).subscribe(
      (data)=>console.log(data)
    )
    console.log(this.productForm.getRawValue())
  }
}
