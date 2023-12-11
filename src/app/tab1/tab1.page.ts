import { Component, OnInit, Input } from '@angular/core';
import { NewsapiService } from '../services/newsapi.service';

import { Respuesta, Article } from '../interfaces/interfaces';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  
  constructor(private newsapiService: NewsapiService) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  cargarNoticias(ev?:any){
    this.newsapiService.obtenerNoticias()
    .subscribe((data: Respuesta)=> {
      console.log(data.articles.length);
      if(data.articles.length === 0){
      ev.target.disable = true;
      ev.target.complete();
      return
      }
      this.noticias.push(...data.articles);


      if (ev){
        ev.target.complete();
      }
    });
  }


  onIonInfinite(ev:any) {
    console.log(ev);
    this.cargarNoticias(ev);
  }
  
}
