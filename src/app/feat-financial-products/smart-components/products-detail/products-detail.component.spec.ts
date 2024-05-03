import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailComponent } from './products-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';
import { computed, signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ProductsDetailComponent', () => {
  let component: ProductsDetailComponent;
  let fixture: ComponentFixture<ProductsDetailComponent>;
  let mockFinancialProductsState: FinancialProductsState;
  let routerMock: Router;
  const mockProduct =
  {
    id: "321321",
    name: "Peluqueria",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  }
  const mockProductB =
  {
    id: "121321",
    name: "Cualca",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  }

  let mockProductsSignal = signal([mockProduct, mockProductB])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDetailComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: mockProduct.id })
          },
        },
        {
          provide: FinancialProductsState, useValue: {
            products: computed(() => mockProductsSignal()),
            updateProduct: jest.fn()
          }
        },
        {
          provide: Router, useValue: { navigateByUrl: jest.fn() }
        }


      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsDetailComponent);
    mockFinancialProductsState = TestBed.inject(FinancialProductsState);
    routerMock = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root if product is not found', () => {
    mockProductsSignal.set([])
    fixture.detectChanges();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should call updateProduct from FinancialProductState if update is called', () => {
    const updateProductSpy = jest.spyOn(mockFinancialProductsState, 'updateProduct');
    component.update(mockProduct);
    expect(updateProductSpy).toHaveBeenCalledWith(mockProduct);
  });
});
