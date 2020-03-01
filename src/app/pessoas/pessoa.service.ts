import { PessoaDTO } from './../lancamentos/models/pessoa.dto';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PessoaCadastroDTO } from './models/pessoa-cadastro.dto';

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

  listarTodas(): Promise<PessoaDTO[]> {
    return this.http.get(this.urlPessoas)
    .toPromise()
    .then(response => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.urlPessoas}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put(`${this.urlPessoas}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }

  adicionar(pessoa: PessoaCadastroDTO) {
    return this.http.post<PessoaCadastroDTO>(
      this.urlPessoas, pessoa
    ).toPromise();
  }

  atualizar(pessoa: PessoaCadastroDTO): Promise<PessoaCadastroDTO> {
    return this.http.put<PessoaCadastroDTO>(`${this.urlPessoas}/${pessoa.codigo}`, pessoa)
    .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<PessoaCadastroDTO> {
    return this.http.get<PessoaCadastroDTO>(`${this.urlPessoas}/${codigo}`)
    .toPromise();
  }
}
