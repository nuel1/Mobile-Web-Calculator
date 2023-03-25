import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() value: string = '';
  @Output() event: EventEmitter<null> = new EventEmitter();
  emitEvent() {
    this.event.emit();
  }

  ngOnInit(): void {
    return;
  }
}
