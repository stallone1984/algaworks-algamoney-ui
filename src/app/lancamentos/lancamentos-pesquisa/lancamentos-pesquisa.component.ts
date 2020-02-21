import { Component, OnInit } from '@angular/core';
import { LancamentoDTO } from '../models/lancamento.dto';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  lancamentos: LancamentoDTO[] = [];

  constructor(
    private lancamentoService: LancamentoService
  ){}

  ngOnInit() {
    this.carregarLancamentos()
  }

  carregarLancamentos() {
    this.lancamentoService.pesquisar()
    .then(response => {
      this.lancamentos = response;
    })
  }
}
