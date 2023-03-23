import { Component } from '@angular/core';
import { inputType, InputType } from './main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  parserObject: InputType;

  constructor() {
    this.parserObject = inputType;
  }
}
