import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent  implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false;
  // @Input() noticiasEnFavoritos: boolean = false;
  

  constructor() { 
  }

  ngOnInit() {
    if (this.noticias && this.noticias.length > 0) {
      this.enFavoritos = this.noticias.some((noticia: any) => noticia['enFavoritos']);
      this.enFavoritos = true;
    }
  }
  // private actualizarNoticiasEnFavoritos() {
  //   
  // }

}
