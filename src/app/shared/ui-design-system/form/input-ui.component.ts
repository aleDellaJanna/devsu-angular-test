import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, signal } from "@angular/core";

@Component({
    selector: 'input[devsu-input]',
    standalone: true,
    imports: [CommonModule],
    template: `
    <ng-content class="input"></ng-content>
`,
changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputUiComponent {
    public type = signal<'text' | 'date'>('text');

    @HostBinding('style')
    public get styles(){
        return `
        width: 100%;
        padding: 12px 20px;
        margin: 2px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid gray;
        `
    }
}