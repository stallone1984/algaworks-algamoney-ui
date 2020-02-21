import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LancamentoDTO } from './models/lancamento.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  urlLancamentos = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Promise<LancamentoDTO[]> {
    return this.http.get(`${this.urlLancamentos}?resumo`)
    .toPromise()
    .then(response => response['content']);
  }
}
