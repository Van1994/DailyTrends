import { Component, ViewEncapsulation, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'dt-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent {
  @Output() addButtonEmitter: EventEmitter<void> = new EventEmitter<void>();

  addElement() {
    this.addButtonEmitter.emit();
  }
}
