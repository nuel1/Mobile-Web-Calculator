import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() value = '';
  @Output() event = new EventEmitter<string>();
  @Input() cssClasses = '';
  @Input() isDisabled = false;

  emitEvent() {
    this.event.emit(this.value);
  }
}
