import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, signal } from "@angular/core";

@Component({
    selector: 'select[devsu-select]',
    standalone: true,
    imports: [CommonModule],
    template: `
    <ng-content></ng-content>
`,
changeDetection: ChangeDetectionStrategy.OnPush

})
export class SelectUiComponent {

    @HostBinding('style')
    public get styles(){
        return `
        padding: 4px 12px;
        margin: 8px 0;
        border: 1px solid #ccc;
        display: 'inline-block';
        border-radius: 4px;
        border: 1px solid gray;
        
        `
    }
}