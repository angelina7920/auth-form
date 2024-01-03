import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-second-button',
  standalone: true,
  imports: [],
  templateUrl: './second-button.component.html',
  styleUrl: './second-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondButtonComponent {

}
