import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'button[devsu-button]',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `  <ng-content></ng-content>
    `,
    styles: [`
    .default{
        background: #ecd54f !important;

    }

    .button{
        width: 100%;
        padding: 00.5rem;
        border-radius: 0.5rem/* 8px */ !important;
        border-color: #d1d5dba2 !important;

        cursor: pointer;
        @media (min-width: 768px) {
            width: auto !important;
        }
    }
    .red{
        background: red !important;

    }
    .light{
        background: #fff !important;
    }
    .light:focus{
        outline: 2px solid transparent !important;
        outline-offset: 2px !important;
    }
    .cursor-not-allowed{
        cursor: not-allowed !important;
    }
  `],
})
export class ButtonUiComponent {
    @Input() public buttonType:
        | 'none'
        | 'default'
        | 'light'
        | 'red'
        = 'light';

    @Input() public btnDisabled = false;

    @HostBinding('class') get class() {
        let extraClasses = '';

        if (this.btnDisabled) {
            extraClasses += 'cursor-not-allowed';
          }
        switch (this.buttonType) {
            case 'default':
                return `${extraClasses} button default`;         
            case 'light':
                return `${extraClasses} button light`;        
            case 'red':
                return `${extraClasses} button red`;    
            case 'none':
                return `button light`;         
            default:
                return `${extraClasses} button light`;         
        }
    }
}
