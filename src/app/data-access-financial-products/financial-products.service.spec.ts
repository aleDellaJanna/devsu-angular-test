import { TestBed, fakeAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FinancialProductsService } from './financial-products.service';
import { FinancialProduct } from '../type-database/financial-product.type';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;
  let httpMock: HttpTestingController;
  // const apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
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
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FinancialProductsService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return financial products', () => {
    const mockProducts: FinancialProduct[] = [mockProduct];
    service.get().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
  it('should update product successfully', () => {

    service.updateProduct(mockProduct).subscribe(data => {
      expect(data).toEqual(mockProduct); 
    });

    const req = httpMock.expectOne(`${service.baseUrl}`); 

    expect(req.request.method).toEqual('PUT'); 
    expect(req.request.body).toEqual(mockProduct); 

    req.flush(mockProduct);
  });

  it('should handle error when updating product', () => {
 

    service.updateProduct(mockProduct).subscribe(
      data => fail('expected an error'), 
      error => {
        expect(error).toBeTruthy(); 
       
      }
    );

    const req = httpMock.expectOne(`${service.baseUrl}`); 
    req.error(new ErrorEvent('fake network error')); 
  });
  it('should handle error properly when trying to get products', () => {
    const errorMessage = '404 Not Found';
    service.get().subscribe(
      products => fail('expected an error'),
      error => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${service.baseUrl}`);
    req.error(new ErrorEvent('404'), { status: 404, statusText: 'Not Found' });
  });

  it('should check if id is available', () => {
    const mockId = '123';
    service.checkIdAvailable(mockId).subscribe(data => {
      expect(data).toBe(true);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/verification?id=${mockId}`);

    expect(req.request.method).toEqual('GET'); 

    req.flush(true);
  });
});
