import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LancamentoDTO } from './models/lancamento.dto';
import { Observable } from 'rxjs';

export interface FiltroLancamento {
  descricao: string
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  urlLancamentos = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: FiltroLancamento): Promise<LancamentoDTO[]> {
    let params = new HttpParams();
    if(filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.urlLancamentos}?resumo`, { params })
    .toPromise()
    .then(response => response['content']);
  }
}
