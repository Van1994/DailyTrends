import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Feed } from '../model/feed';

@Component({
  selector: 'dt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {

  dummyNewsArray: Feed[];

  noticiaVacia: Feed;

  isAdding= false;

  constructor() {
  }

  ngOnInit() {
    this.dummyNewsArray = [
      {id: 1, title: 'Noticia 1', body: 'Este es el cuerpo de la noticia 1', image: 'https://phantom-elmundo.unidadeditorial.es/ec3319456390fc328e4c108e5ed88518/crop/0x0/2046x1364/resize/990/f/jpg/assets/multimedia/imagenes/2020/09/21/16007076484706.jpg', source: '', publisher: 'EL MUNDO'},
      {id: 2, title: 'Noticia 2', body: 'Este es el cuerpo de la noticia 2', image: '', source: '', publisher: 'EL MUNDO'},
      {id: 3, title: 'Noticia 3', body: 'Este es el cuerpo de la noticia 3', image: '', source: '', publisher: 'EL MUNDO'},
    ]
  }

  addElement() {
    this.noticiaVacia = {id: this.getLastID(), title: '', body: '', image: '', source: '', publisher: ''};
    this.isAdding = true;
  }

  getLastID() {
    let maxId = 0;
    this.dummyNewsArray.forEach( (item, index) => {
      maxId= maxId > item.id ? maxId : item.id;
    });
    maxId += 1;
    return maxId;
  }

  deleteElement(id: number) {
    debugger;
    this.dummyNewsArray.forEach( (item, index) => {
      if(item.id === id) this.dummyNewsArray.splice(index,1);
    });
  }

  cancelAddingElement() {
    this.isAdding = false;
  }

  saveNewElement() {
    const myClonedElement = {...this.noticiaVacia};
    this.isAdding = false;
    this.dummyNewsArray.push(myClonedElement);
  }
}
