import { Component, ElementRef, computed, inject, input } from '@angular/core';

@Component({
  selector: '[devus-skeleton]',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {

  // private readonly elementRef = inject(ElementRef);
  lines = input<number>();

  ammountOfLines = computed(()=>new Array(this.lines()))
  width = input.required<number>();
  height = input.required<number>();


  

}
