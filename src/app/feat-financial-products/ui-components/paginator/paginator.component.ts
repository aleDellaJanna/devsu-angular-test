import { Component, EventEmitter, Input, Output, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  totalProducts = input.required<number>();
  pagesSizes = input([5,10,20]);
  itemPerPage = input(5);
  @Output() itemPerPageChanged = new EventEmitter<number>(); //output signal could be used instead
  pageIndex = input(1)
  protected startIndex = computed(()=>(this.pageIndex()-1)*this.itemPerPage())


}
