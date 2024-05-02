import { Component } from '@angular/core';
import { ProductFormComponent } from '../../ui-components/product-form/product-form.component';

@Component({
  selector: 'app-products-add',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.scss'
})
export class ProductsAddComponent {

}
