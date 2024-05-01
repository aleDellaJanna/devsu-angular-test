import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockFinancialProductsState: FinancialProductsState;

  const mockProduct =
  {
    id: "321321",
    name: "Portatil Hp",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  }
  const mockProductB =
  {
    id: "121321",
    name: "Portatil Hp 2",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        {
          provide: FinancialProductsState,
          useValue: {
            getFinancialProducts: jest.fn(),
            products: jest.fn().mockReturnValue([mockProduct, mockProductB]),
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

  it('should initially call getFinancialProducts from FinancialProductsState', ()=>{
    expect(mockFinancialProductsState.getFinancialProducts).toHaveBeenCalled();

  })
});
