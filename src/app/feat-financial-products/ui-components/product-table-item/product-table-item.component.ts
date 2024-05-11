import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, inject, input, signal } from '@angular/core';
import { FinancialProduct } from '../../../type-database/financial-product.type';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[product-table-item]',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './product-table-item.component.html',
  styleUrl: './product-table-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableItemComponent {
  product = input.required<FinancialProduct>();
  dropdownOpen = signal(false);
  private el = inject(ElementRef);

  @Output() deleteProduct = new EventEmitter<FinancialProduct>();

  @HostListener("document:click",['$event.target']) 
  clicked(target:any) { 
    const clickedItem = this.el.nativeElement.contains(target);
    if(!clickedItem){
      this.dropdownOpen.set(false)

    }
  } 
}

