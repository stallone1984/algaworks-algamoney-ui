import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoDTO } from '../models/lancamento.dto';
import { LancamentoService, FiltroLancamento } from '../lancamento.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';
import {ConfirmationService} from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos: LancamentoDTO[] = [];
  filtro = new FiltroLancamento();
  totalResgistros = 0;
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private toast: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then(response => {
      this.lancamentos = response.lancamentos;
      this.totalResgistros = response.totalResgistros;
    })
    .catch(error => this.errorHandler.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: LancamentoDTO) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.grid.reset();
      this.toast.success('Lançamento excluído com sucesso');
    })
    .catch(error => {
      this.errorHandler.handle(error);
      console.log(error);

    });
  }

  confirmarExclusao(lancamento: LancamentoDTO) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }
}
