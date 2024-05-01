import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputUiComponent } from '../../../shared/ui-design-system/form/input-ui.component';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule, InputUiComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() searchTerm: string = '';
  @Input({ required: true }) label!: string;

  @Output() searchTermChanged = new EventEmitter<string>();
}
