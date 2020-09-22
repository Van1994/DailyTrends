import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Feed } from '../../model/feed';

@Component({
  selector: 'dt-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewComponent implements OnInit {

  @Input() noticia: Feed;
  isEditMode: boolean;
  addingElement: boolean;
  @Input() set editMode(value) {
    this.isEditMode = value;
    this.addingElement = value;
  }
  @Output() deleteEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() addEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {

  }

  edit() {
    this.isEditMode= true;
  }

  save() {
    if(this.addingElement) {
      this.addEmitter.emit();
    } else {
      this.isEditMode= false;
    }

  }

  delete() {
    if(this.addingElement) {
      this.cancelEmitter.emit();
    } else {
      this.deleteEmitter.emit();
    }
  }
}
