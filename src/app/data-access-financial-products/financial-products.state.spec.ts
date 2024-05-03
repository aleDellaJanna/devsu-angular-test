import { TestBed, inject } from '@angular/core/testing';
import { FinancialProductsState, State } from './financial-products.state';
import { FinancialProductsService } from './financial-products.service';
import { of, throwError } from 'rxjs';
import { FinancialProduct } from '../type-database/financial-product.type';

describe('FinancialProductsState', () => {
  let stateService: FinancialProductsState;
  let productService: FinancialProductsService;
  const mockProduct =
  {
    id: "321321",
    name: "Portatil Hp",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FinancialProductsService,
          useValue: {
            get: jest.fn().mockReturnValue([mockProduct]),
            updateProduct: jest.fn().mockReturnValue(of([mockProduct]))
            
          }
        }
      ]
    });
    stateService = TestBed.inject(FinancialProductsState);
    productService = TestBed.inject(FinancialProductsService);
  });

  it('should be created', () => {
    expect(stateService).toBeTruthy();
  });

  it('should update state when products are fetched successfully', () => {
    const mockProducts: FinancialProduct[] = [mockProduct];
    productService.get = jest.fn(() => of(mockProducts));

    stateService.getFinancialProducts();

    expect(stateService['state']()).toStrictEqual({
      error: null,
      products: mockProducts,
      loaded: true,
      loading: false
    });
  });

  it('should update state when an error occurs during products fetching', () => {
    const errorMessage = 'Error al obtener los productos';
    productService.get = jest.fn(() => throwError(errorMessage));

    stateService.getFinancialProducts();

    expect(stateService['state']()).toStrictEqual({
      error: errorMessage,
      products: [],
      loaded: false,
      loading: false
    });
  });

  it('should call updateProduct of service when called', () => {

    stateService.updateProduct(mockProduct);
    expect(productService.updateProduct).toHaveBeenCalledWith(mockProduct)
  });
});