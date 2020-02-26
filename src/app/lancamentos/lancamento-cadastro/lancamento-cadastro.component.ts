import { LancamentoCadastroDTO } from './../models/lancamento-cadastro.dto';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { CategoriaDTO } from './../../categorias/categoria.dto';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';

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
  lancamento = new LancamentoCadastroDTO();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toast: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.lancamentoService.buscarPorCodigo(codigo)
      .then(response => {
        console.log(response);
        this.lancamento = response;
      });
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.toast.success('Lançamento adicionado com sucesso');
      form.reset();
      this.lancamento = new LancamentoCadastroDTO();
    })
    .catch(error => {
      this.errorHandler.handle(error);
    });

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
