import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'devsu-modal',
  standalone: true,
  imports: [CommonModule, PortalModule, OverlayModule],
  templateUrl: './modal.ui-component.html',
  styleUrls: ['./modal.ui-component.scss'],
})
export class ModalUiComponent implements OnDestroy, AfterViewInit {
  private readonly overlay = inject(Overlay);
  // get a grasp on the ng-template with the cdkPortal directive
  @ViewChild(CdkPortal) public readonly portal: CdkPortal | undefined;
  @Output() public readonly closeDialog = new EventEmitter<void>();

  private readonly overlayConfig = new OverlayConfig({
    // show backdrop
    hasBackdrop: true,
    // position the dialog in the center of the page
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    // when in the dialog, block scrolling of the page
    scrollStrategy: this.overlay.scrollStrategies.block(),
    minWidth: 500,
  });
  private overlayRef = this.overlay.create(this.overlayConfig);

  public ngAfterViewInit(): void {
    // Wait until the view is initialized to attach the portal to the overlay
    this.overlayRef?.attach(this.portal);
  }

  constructor() {
    this.overlayRef?.backdropClick().subscribe(() => {
      this.closeDialog.emit();
    });
  }

  public ngOnDestroy(): void {
    // parent destroys this component, this component destroys the overlayRef
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }
}
