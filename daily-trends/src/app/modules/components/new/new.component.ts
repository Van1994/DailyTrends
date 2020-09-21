import { Component, ViewEncapsulation, OnInit, Input } from "@angular/core";
import { Feed } from '../../model/feed';

@Component({
  selector: 'dt-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewComponent implements OnInit {

  @Input() noticia: Feed;

  constructor() {
  }

  ngOnInit() {

  }
}
