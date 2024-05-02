import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAddComponent } from './products-add.component';
import { FinancialProduct } from '../../../type-database/financial-product.type';
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { of } from 'rxjs';

describe('ProductsAddComponent', () => {
  let component: ProductsAddComponent;
  let fixture: ComponentFixture<ProductsAddComponent>;
  let financialProductServiceMock: FinancialProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAddComponent],
      providers: [
        {
          provide: FinancialProductsService, useValue: {
            createProduct: jest.fn().mockReturnValue(of([]))
          }
        } 

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsAddComponent);
    financialProductServiceMock = TestBed.inject(FinancialProductsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call financialProductService.createProduct() when save() is called', () => {
    const createProductSpy = jest.spyOn(financialProductServiceMock, 'createProduct');

    const product: FinancialProduct = {
      id: '123',
      name: 'Product',
      description: 'Description',
      logo: 'logo.png',
      date_release: new Date().toISOString().split('T')[0],
      date_revision: new Date().toISOString().split('T')[0]
    };

    component.save(product);

    expect(createProductSpy).toHaveBeenCalledWith(product);
  });
});
