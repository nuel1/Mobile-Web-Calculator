import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-calculator-screen',
  templateUrl: './calculator-screen.component.html',
  styleUrls: ['./calculator-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorScreenComponent {
  @Input() operation = '';
  @Input() input = '';
}
