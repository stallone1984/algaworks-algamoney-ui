import { LancamentoCadastroDTO } from './../models/lancamento-cadastro.dto';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
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
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(response => {
      console.log(response);
      this.lancamento = response;
    })
    .catch(error => {
      this.errorHandler.handle(error);
    });
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
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

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.toast.success('Lancamento alterado com sucesso');
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
