import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoDTO } from '../models/lancamento.dto';
import { LancamentoService, FiltroLancamento } from '../lancamento.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos: LancamentoDTO[] = [];
  filtro = new FiltroLancamento();
  totalResgistros = 0;
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private toast: ToastyService
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then(response => {
      this.lancamentos = response.lancamentos;
      this.totalResgistros = response.totalResgistros;
    });
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
    });
  }
}
