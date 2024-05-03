import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUiComponent } from '../ui-design-system/modal/modal.ui-component';
import { ButtonUiComponent } from '../ui-design-system/button-ui.component';


@Component({
  selector: 'devsu-delete-modal',
  standalone: true,
  imports: [CommonModule, ModalUiComponent, ButtonUiComponent],
  templateUrl: './delete-modal.ui-component.html',
  styleUrls: ['./delete-modal.ui-component.scss'],
})
export class DeleteModalUiComponent {
  @Output() public readonly approve = new EventEmitter();
  @Output() public readonly decline = new EventEmitter();
  public name = input('');
}
