import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Respuesta } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  pagina = 0;

  constructor(private http: HttpClient) { }

  ejecutarSolicitud<T>(query: string){
    query = apiUrl + query;
    return this.http.get<T>(query,{headers})
  }

  obtenerNoticias(){
    this.pagina++
    return this.ejecutarSolicitud<Respuesta>(`/top-headlines?country=us&page=${this.pagina}`);
  }

}
