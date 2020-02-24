import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { CategoriaDTO } from './../../categorias/categoria.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
    .then(response => {
      this.categorias = response.map(cat => ({ label: cat.nome, value: cat.codigo }));
    });
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
    .then(response => {
      this.pessoas = response.map(p => ({ label: p.nome, value: p.codigo }));
    });
  }
}
