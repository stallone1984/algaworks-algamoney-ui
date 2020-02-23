import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { Table } from 'primeng/table/table';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { PessoaService, FiltroPessoa } from './../pessoa.service';
import { PessoaDTO } from './../../lancamentos/models/pessoa.dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas: PessoaDTO[] = [];
  filtro = new FiltroPessoa();
  totalRegistros = 0;

  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private pessoaService: PessoaService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
    .then(response => {
      this.pessoas = response.pessoas;
      this.totalRegistros = response.totalRegistros;
    })
    .catch(error => this.errorHandler.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(pessoa: PessoaDTO) {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      this.grid.reset();
      this.toasty.success('Pessoa excluída com sucesso');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(pessoa: PessoaDTO) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir esta pessoa?',
      accept: () => this.excluir(pessoa)
    });
  }
}
