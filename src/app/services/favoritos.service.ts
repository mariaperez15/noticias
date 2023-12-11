import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {


  favoritos: Article [] = [];
  constructor(private storage: Storage, private toast: ToastController) {
  this.init();
  }

  async init() {
    await this.storage.create();
    this.cargarFavoritos();
  }

  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    console.log(favoritos);

    if(favoritos){
      this.favoritos = favoritos;
    }
  }
 

  guardarEnFavoritos(noticia: Article){
    const existe = this.favoritos.find(not => not.title === noticia.title);
    if(!existe){
      this.favoritos.unshift(noticia);
      this.storage.set('favoritos', this.favoritos); //lo vamos a guardar en la propiedad favoritos y lo que vamos a guardar son favoritos
      this.mostrarToast('Favorito guardado');
      
    }
  }

  async eliminarDeFavoritos(favorito: Article){
    this.favoritos = this.favoritos.filter(not => not.title !== favorito.title);
    this.storage.set('favoritos', this.favoritos);
    this.mostrarToast('Borrado de favoritos');
  }

  async mostrarToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
  
      await toast.present();
  }

    
}
