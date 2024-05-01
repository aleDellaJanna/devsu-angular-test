import { TestBed } from '@angular/core/testing';

import { FinancialProductsState } from './financial-products.state';

describe('FinancialProductsState', () => {
  let service: FinancialProductsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialProductsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
