import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { idAvailableValidator } from '../../../util-form-validators/id-available.validator';
import { of } from 'rxjs';


const idAvailableValidatorMock: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return  of(control.value === '1' ? null : { idAvailable: true });
};
const dateValidatorMock: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return  new Date(control.value) >= new Date() ? null : { dateValidator: true };
};
describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let fb: FormBuilder;
  let mockFinancialProductService: FinancialProductsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [
        {
          provide: FinancialProductsService,
          useValue: {
            checkIdAvailable: jest.fn().mockReturnValue(true)
          }
        },
        FormBuilder,

      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);

    mockFinancialProductService = TestBed.inject(FinancialProductsService);

    component.productForm = fb.nonNullable.group({
      id: ['', Validators.required],
      name: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: [''],
      date_revision: [''],
    });
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
  it('should reset the form when reset() is called', () => {
    const product = { id: '123', name: 'Product', description: 'Description', logo: 'logo.png', date_release: new Date().toISOString().split('T')[0], date_revision: new Date().toISOString().split('T')[0] };
    component.productForm.setValue(product);

    component.reset();
    expect(component.productForm.value).toEqual({ id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' });
  });

  it('should emit formSubmited event when form is valid and submit() is called', () => {
    jest.spyOn(component.formSubmited, 'emit');

    const product = { id: '123', name: 'Product', description: 'Description', logo: 'logo.png', date_release: new Date().toISOString().split('T')[0], date_revision: new Date().toISOString().split('T')[0] };
    component.productForm.patchValue(product);
    
    fixture.detectChanges()
    component.submit();

    expect(component.formSubmited.emit).toHaveBeenCalledWith(product);
  });
});
