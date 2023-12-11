import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { FavoritosService } from 'src/app/services/favoritos.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent  implements OnInit {

  @Input () noticia!: Article;
  @Input () enFavoritos: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private favServer: FavoritosService) { }

  ngOnInit() {
    console.log('enFavoritos:', this.enFavoritos);
  }

   async mostrarMenu(){
    
    const guardarBorrarFavorito = {
      text: this.noticia.enFavoritos ? 'Borrar de favoritos' : 'Añadir a favoritos',
      icon: this.noticia.enFavoritos ? 'trash' : 'star',
      handler: () => {
        if (this.noticia.enFavoritos) {
          console.log('eliminar de favoritos');
          this.favServer.eliminarDeFavoritos(this.noticia);
        } else {
          console.log('añadido');
          this.favServer.guardarEnFavoritos(this.noticia);
        }
      }
    };
    
    const mostrar = await this.actionSheetCtrl.create({
      buttons: [ 
        guardarBorrarFavorito,
        {
          text: 'Cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await mostrar.present();
  }

  borrarFav(){
    this.favServer.eliminarDeFavoritos(this.noticia);
    console.log('noticia borrada');
  }


}
