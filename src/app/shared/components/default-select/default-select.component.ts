import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DefSelect } from '../../interfaces/default-select.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-default-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './default-select.component.html',
  styleUrl: './default-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultSelectComponent {
  @Input() options: DefSelect[] = []
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  onSelectionChange(event: any): void {
    const selectedValue = event.target.value;
    this.selectionChange.emit(selectedValue);
  }
}
