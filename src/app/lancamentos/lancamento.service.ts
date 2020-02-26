import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LancamentoDTO } from './models/lancamento.dto';
import * as moment from 'moment';
import { LancamentoCadastroDTO } from './models/lancamento-cadastro.dto';

export class FiltroLancamento {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  urlLancamentos = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: FiltroLancamento): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.urlLancamentos}?resumo`, { params })
    .toPromise()
    .then(response => {
      const lancamentos: LancamentoDTO[] = response['content'];

      const resultado = {
        lancamentos,
        totalResgistros: response['totalElements']
      };

      return resultado;
    });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.urlLancamentos}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: LancamentoCadastroDTO) {
    return this.http.post<LancamentoCadastroDTO>(
      this.urlLancamentos, lancamento
    ).toPromise();
  }

  atualizar(lancamento: LancamentoCadastroDTO): Promise<LancamentoCadastroDTO> {
    return this.http.put<LancamentoCadastroDTO>(`${this.urlLancamentos}/${lancamento.codigo}`, lancamento)
    .toPromise()
    .then(response => {
      this.converterStringsParaDatas([response]);
      return response;
    });
  }

  buscarPorCodigo(codigo: string): Promise<LancamentoCadastroDTO> {
    return this.http.get<LancamentoCadastroDTO>(`${this.urlLancamentos}/${codigo}`)
    .toPromise()
    .then(lancamento => {
      this.converterStringsParaDatas([lancamento]);
      return lancamento;
    });
  }

  private converterStringsParaDatas(lancamentos: LancamentoCadastroDTO[]) {
    lancamentos.forEach(lanc => {
      lanc.dataVencimento = moment(lanc.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lanc.dataPagamento) {
        lanc.dataPagamento = moment(lanc.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    });
  }
}
