import { LazyLoadEvent } from 'primeng/api/public_api';
import { PessoaService, FiltroPessoa } from './../pessoa.service';
import { PessoaDTO } from './../../lancamentos/models/pessoa.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas: PessoaDTO[] = [];
  filtro = new FiltroPessoa();
  totalRegistros = 0;

  constructor(private pessoaService: PessoaService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
    .then(response => {
      this.pessoas = response.pessoas;
      this.totalRegistros = response.totalRegistros;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
