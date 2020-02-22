import { Component, OnInit } from '@angular/core';
import { LancamentoDTO } from '../models/lancamento.dto';
import { LancamentoService, FiltroLancamento } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  descricao: string;
  lancamentos: LancamentoDTO[] = [];
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  constructor(
    private lancamentoService: LancamentoService
  ){}

  ngOnInit() {
    this.pesquisar()
  }

  pesquisar() {
    const filtro: FiltroLancamento = {
      descricao: this.descricao, 
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    }
    this.lancamentoService.pesquisar(filtro)
    .then(response => {
      this.lancamentos = response;
    })
  }
}
