import { Component, OnInit } from '@angular/core';
import { PessoaCadastroDTO } from './../models/pessoa-cadastro.dto';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';

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
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(formCadastroPessoa: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.toast.success('Pessoa cadastrada com sucesso');
      this.pessoa = new PessoaCadastroDTO();
      formCadastroPessoa.reset();
    });
  }

}
