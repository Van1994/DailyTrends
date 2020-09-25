import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Feed } from '../model/feed';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Component({
  selector: 'dt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {

  newsArray: Feed[] = [];

  noticiaVacia: Feed;

  isAdding= false;

  constructor() {
  }

  ngOnInit() {
    this.scrapWeb('EL MUNDO');
  }

  addElement() {
    this.noticiaVacia = {id: this.getLastID(), title: '', body: '', image: '', source: '', publisher: '', url: ''};
    this.isAdding = true;
  }

  getLastID() {
    let maxId = 0;
    this.newsArray.forEach( (item, index) => {
      maxId= maxId > item.id ? maxId : item.id;
    });
    maxId += 1;
    return maxId;
  }

  deleteElement(id: number) {
    this.newsArray.forEach( (item, index) => {
      if(item.id === id) this.newsArray.splice(index,1);
    });
  }

  cancelAddingElement() {
    this.isAdding = false;
  }

  saveNewElement() {
    const myClonedElement = {...this.noticiaVacia};
    this.isAdding = false;
    this.newsArray.push(myClonedElement);
  }

  scrapWeb(periodico: string) {
    let url = 'https://cors-anywhere.herokuapp.com/'; // URL we're scraping

    switch (periodico) {
      case 'EL MUNDO': url+='https://www.elmundo.es/'; break;
      case 'EL PAIS': url+='https://www.elpais.com/'; break;
      default: return; break;
    }

    const AxiosInstance = axios.create();

    AxiosInstance.get(url).then(
    response => {
      const html = response.data; // Get the HTML from the HTTP request
      const $ = cheerio.load(html); // Load the HTML string into cheerio
      //const newsPanel = $('#fusion-app');


      $('article').each((i, el) => {
        if(i<6) {
          const title = $(el).find('.ue-c-cover-content__headline').text();
          const source = $(el).find('.ue-c-cover-content__byline-name').text();
          const img = $(el).find('img').attr('src');
          const href = $(el).find('.ue-c-cover-content__link').attr('href');
          const id = this.getLastID();
          this.newsArray.push ({
            id: id,
            title: title,
            body: '',
            image: img? img : null,
            source: source,
            publisher: periodico,
            url: href
          });

          this.getBodyText(id);
        }
      })
    }
  )
  .catch(console.error); // Error handling
  }


  getBodyText(id: number){
    this.newsArray.forEach( (item, index) => {
      if(item.id === id) {
        let url = 'https://cors-anywhere.herokuapp.com/'+item.url; // URL we're scraping

        const AxiosInstance = axios.create();

        AxiosInstance.get(url).then(
        response => {
          const html = response.data; // Get the HTML from the HTTP request
          const $ = cheerio.load(html); // Load the HTML string into cheerio
          item.body = $('.ue-c-article__standfirst').text();
          item.source = $('.ue-c-article__byline-name').text();
          item.image = $('.ue-c-article__media-img-container').find('img').attr('src');
        }
      ).catch(console.error);
      }
    });
  }
}
