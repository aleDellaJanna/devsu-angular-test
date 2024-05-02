import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputUiComponent } from '../../../shared/ui-design-system/form/input-ui.component';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputUiComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  productForm = this.fb.nonNullable.group({
    id: ['', Validators.required],
    name: ['', [Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    date_release: ['', this.dateReleaseValidator],
    date_revision: [{value:'', disabled: true}],
  });


  idTaken = toSignal(this.productForm.controls.id.statusChanges);
  dateReleaseChanged = toSignal(this.productForm.controls.date_release.valueChanges)
  constructor() {
    effect(() => {
      if (this.dateReleaseChanged()) {
        console.log(this.dateReleaseChanged())
        const releaseDate = new Date(this.productForm.get('date_release')?.getRawValue());
        const oneYearAhead = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate()+1);
        this.productForm.controls.date_revision.setValue(oneYearAhead.toISOString().split('T')[0])
        console.log(this.productForm.controls.date_revision.value)
      }
    })
  }
  dateReleaseValidator(control: FormControl) {
    const releaseDate = new Date(control.value);
    const today = new Date();
    return releaseDate > today ? null : { invalidReleaseDate: true };
  }

  dateRevisionValidator(control: FormControl) {
    const releaseDate = new Date(control.parent?.get('date_release')!.value);
    const revisionDate = new Date(control.value);
    const oneYearAhead = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate());
    return revisionDate === oneYearAhead ? null : { invalidRevisionDate: true };
  }
}
