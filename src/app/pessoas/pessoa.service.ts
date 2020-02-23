import { PessoaDTO } from './../lancamentos/models/pessoa.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class FiltroPessoa {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  urlPessoas = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: FiltroPessoa): Promise<any> {
    let params = new HttpParams();
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.urlPessoas, { params })
    .toPromise()
    .then(response => {
      const pessoas: PessoaDTO[] = response['content'];
      const resultado = {
        pessoas,
        totalRegistros: response['totalElements']
      };

      return resultado;
    });
  }

  listarTodas(): Promise<PessoaDTO> {
    return this.http.get(this.urlPessoas)
    .toPromise()
    .then(response => response['content']);
  }
}
