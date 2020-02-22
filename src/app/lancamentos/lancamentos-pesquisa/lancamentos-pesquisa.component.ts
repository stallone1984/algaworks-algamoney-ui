import { Component, OnInit } from '@angular/core';
import { LancamentoDTO } from '../models/lancamento.dto';
import { LancamentoService, FiltroLancamento } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  lancamentos: LancamentoDTO[] = [];
  filtro = new FiltroLancamento();

  constructor(
    private lancamentoService: LancamentoService
  ){}

  ngOnInit() {
    this.pesquisar()
  }

  pesquisar() {
    this.lancamentoService.pesquisar(this.filtro)
    .then(response => {
      this.lancamentos = response.lancamentos;
    })
  }
}
