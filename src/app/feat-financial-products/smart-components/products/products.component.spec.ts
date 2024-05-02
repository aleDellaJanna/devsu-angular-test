import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';
import { By } from '@angular/platform-browser';
import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonUiComponent } from '../../../shared/ui-design-system/button-ui.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockFinancialProductsState: FinancialProductsState;

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
    jest.restoreAllMocks()
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, RouterLink,ButtonUiComponent, RouterTestingModule],
      providers: [
        {
          provide: FinancialProductsState,
          useValue: {
            getFinancialProducts: jest.fn().mockReturnValue(mockProductsSignal),
            products: computed(()=>mockProductsSignal()),
            loading: jest.fn(),
            error: jest.fn()

          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    mockFinancialProductsState = TestBed.inject(FinancialProductsState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially call getFinancialProducts from FinancialProductsState', () => {
    expect(mockFinancialProductsState.getFinancialProducts).toHaveBeenCalled();

  });

  it('should filter the products list when searchTerm gets a new value', () => {
    const searchTerm = mockProduct.name;
    const items = fixture.debugElement.queryAll(By.css('[data-test="product-item"]'));
    expect(items.length).toEqual(2)
    component.searchTerm.set(searchTerm);
    fixture.detectChanges()
    const itemsB = fixture.debugElement.queryAll(By.css('[data-test="product-item"]'));
    expect(itemsB.length).toEqual(1)
    
  });
  it('should display more items if itemsPerPageChanged', () => {
    const itemsPerPage = 10;
    const products = [mockProduct,mockProduct,mockProduct,mockProduct,mockProduct,mockProduct,mockProduct]
    mockProductsSignal.set(products)
    fixture.detectChanges()
    const items = fixture.debugElement.queryAll(By.css('[data-test="product-item"]'));
    expect(items.length).toEqual(5)
    component.itemsPerPage.set(itemsPerPage);
    fixture.detectChanges()
    const itemsB = fixture.debugElement.queryAll(By.css('[data-test="product-item"]'));
    expect(itemsB.length).toEqual(products.length)
    
  });
  it('should display the next following items', () => {
    const products = [
      mockProduct,
      mockProduct,
      mockProduct,
      mockProduct,
      mockProduct,
      mockProductB, //1st element after nextpage called with 5 items per page
      mockProduct]
    mockProductsSignal.set(products)
    fixture.detectChanges()
    const items = fixture.debugElement.queryAll(By.css('[data-test="product-item"]'));
    console.log(items[0].nativeElement.textContent)
    expect(items[0].nativeElement.textContent).toContain('Peluqueria')
    component.nextPage()
    fixture.detectChanges()
    const itemsB = fixture.debugElement.queryAll(By.css('[data-test="product-item"]'));
    expect(itemsB[0].nativeElement.textContent).toContain('Cualca')
    
  });

});
