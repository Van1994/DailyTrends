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
    this.scrapWebElMundo('EL MUNDO');
    this.scrapWebElPais('EL PAIS');
  }

  addElement() {
    this.noticiaVacia = {id: this.getNextID(), title: '', body: '', image: '', source: '', publisher: '', url: ''};
    this.isAdding = true;
  }

  getNextID() {
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

  scrapWebElPais(periodico: string) {
    const urlElPais = "https://www.elpais.com/";
    let url = 'https://cors-anywhere.herokuapp.com/' + urlElPais; // URL we're scraping

    const AxiosInstance = axios.create();

    AxiosInstance.get(url).then(
    response => {
      const html = response.data; // Get the HTML from the HTTP request
      const $ = cheerio.load(html); // Load the HTML string into cheerio

      $('article').each((i, el) => {
        if(i<5) {
          const title = $(el).find('.headline').find('a').text();
          const href = urlElPais + $(el).find('.headline').find('a').attr('href');
          const id = this.getNextID();
          this.newsArray.push ({
            id: id,
            title: title,
            body: '',
            image: '',
            source: '',
            publisher: periodico,
            url: href
          });

          this.getMainInfoElPais(id);
        }
      })
    }
  )
  .catch(console.error); // Error handling
  }

  getMainInfoElPais(id: number){
    this.newsArray.forEach( (item, index) => {
      if(item.id === id) {
        let url = 'https://cors-anywhere.herokuapp.com/'+item.url; // URL we're scraping

        const AxiosInstance = axios.create();

        AxiosInstance.get(url).then(
        response => {
          const html = response.data; // Get the HTML from the HTTP request
          const $ = cheerio.load(html); // Load the HTML string into cheerio
          const sources = [];
          $('.a_aut').each(function(i, elem) {
            sources[i] = $(this).text();
          });
          let sourcelist = sources.join(', ');

          item.body = $('.a_st').text();
          item.source = sourcelist;
          item.image = $('.lead_art').find('img').attr('src');
        }
      ).catch(console.error); // Error handling
      }
    });
  }

  scrapWebElMundo(periodico: string) {
    let url = 'https://cors-anywhere.herokuapp.com/https://www.elmundo.es/'; // URL we're scraping

    const AxiosInstance = axios.create();

    AxiosInstance.get(url).then(
    response => {
      const html = response.data; // Get the HTML from the HTTP request
      const $ = cheerio.load(html); // Load the HTML string into cheerio

      $('article').each((i, el) => {
        if(i<5) {
          const title = $(el).find('.ue-c-cover-content__headline').text();
          const href = $(el).find('.ue-c-cover-content__link').attr('href');
          const id = this.getNextID();
          this.newsArray.push ({
            id: id,
            title: title,
            body: '',
            image: '',
            source: '',
            publisher: periodico,
            url: href
          });

          this.getMainInfoElMundo(id);
        }
      })
    }
  )
  .catch(console.error); // Error handling
  }


  getMainInfoElMundo(id: number){
    this.newsArray.forEach( (item, index) => {
      if(item.id === id) {
        let url = 'https://cors-anywhere.herokuapp.com/'+item.url; // URL we're scraping

        const AxiosInstance = axios.create();

        AxiosInstance.get(url).then(
        response => {
          const html = response.data; // Get the HTML from the HTTP request
          const $ = cheerio.load(html); // Load the HTML string into cheerio

          const sources = [];
          $('.ue-c-article__byline-name').each(function(i, elem) {
            sources[i] = $(this).text();
          });
          let sourcelist = sources.join(', ');

          item.body = $('.ue-c-article__standfirst').text();
          item.source = sourcelist;
          item.image = $('.ue-c-article__media-img-container').find('img').attr('src');
        }
      ).catch(console.error); // Error handling
      }
    });
  }
}
