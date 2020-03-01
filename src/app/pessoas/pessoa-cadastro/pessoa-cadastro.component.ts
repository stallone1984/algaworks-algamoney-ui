import { Component, OnInit } from '@angular/core';
import { PessoaCadastroDTO } from './../models/pessoa-cadastro.dto';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new PessoaCadastroDTO();

  constructor(
    private pessoaService: PessoaService,
    private toast: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Pessoa');
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(response => {
      this.pessoa = response;
      this.atualizarTituloEdicao();
    })
    .catch(error => {
      this.errorHandler.handle(error);
    });
  }

  salvar(formCadastroPessoa: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(formCadastroPessoa);
    } else {
      this.cadastrarPessoa(formCadastroPessoa);
    }
  }

  cadastrarPessoa(formCadastroPessoa: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.toast.success('Pessoa cadastrada com sucesso');
      this.pessoa = new PessoaCadastroDTO();
      formCadastroPessoa.reset();
    });
  }

  atualizarPessoa(formCadastroPessoa: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(response => {
      this.pessoa = response;
      this.toast.success('Pessoa atualizada com sucesso');
      this.atualizarTituloEdicao();
    })
    .catch(error => {
      this.errorHandler.handle(error);
    });
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  novo(formCadastroPessoa: FormControl) {
    formCadastroPessoa.reset();

    setTimeout(function() {
      this.pessoa = new PessoaCadastroDTO();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}
