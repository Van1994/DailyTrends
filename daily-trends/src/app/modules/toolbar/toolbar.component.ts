import { Component, ViewEncapsulation, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'dt-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit {
  @Output() addEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {

  }
}
