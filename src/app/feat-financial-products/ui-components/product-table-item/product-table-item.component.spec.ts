import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableItemComponent } from './product-table-item.component';
import { ElementRef, input } from '@angular/core';

describe('ProductTableItemComponent', () => {
  let component: ProductTableItemComponent;
  let fixture: ComponentFixture<ProductTableItemComponent>;
  let elementRefMock: ElementRef;
  let htmlElement: HTMLElement;
  const mockProduct = 
  {
    id: "321321",
    name: "Peluqueria",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableItemComponent],
      providers: [
        {
          provide: ElementRef, useValue: {
            nativeElement: {
              contains: jest.fn()
            }
      
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductTableItemComponent);
    fixture.componentRef.setInput(
      'product',
      mockProduct
    );
    elementRefMock = TestBed.inject(ElementRef);
    htmlElement = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dropdown when clicking outside the component', () => {
    document.dispatchEvent(new MouseEvent('click'));

    expect(component.dropdownOpen()).toBe(false);
  });

  it('should not close dropdown when clicking inside the component', () => {
    htmlElement.ownerDocument.dispatchEvent(new MouseEvent('click'));

    expect(component.dropdownOpen()).toBe(true);
  });
});
