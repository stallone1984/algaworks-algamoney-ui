import { CategoriaDTO } from './categoria.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  urlCategorias = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.urlCategorias)
    .toPromise()
    .then(response => response);
  }

}
