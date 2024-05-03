import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableItemComponent } from './product-table-item.component';

describe('ProductTableItemComponent', () => {
  let component: ProductTableItemComponent;
  let fixture: ComponentFixture<ProductTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
