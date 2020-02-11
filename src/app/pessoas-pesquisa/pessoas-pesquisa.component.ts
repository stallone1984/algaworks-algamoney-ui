import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    {nome: 'Heitor Bernardino', cidade: 'São José dos Campos', estado: 'SP', ativo: true},
    {nome: 'Luciana Cruz', cidade: 'São José dos Campos', estado: 'SP', ativo: true},
    {nome: 'Luiz Antônio', cidade: 'Aparecida', estado: 'SP', ativo: true},
    {nome: 'Luiz Eduardo', cidade: 'São José dos Campos', estado: 'SP', ativo: false},
    {nome: 'Lilian Cruz', cidade: 'São Paulo', estado: 'SP', ativo: true},
    {nome: 'Marcos Lemos', cidade: 'Belo Horizonte', estado: 'MG', ativo: false},
    {nome: 'Rafael Panta', cidade: 'São Paulo', estado: 'SP', ativo: true},
    {nome: 'Daniel Nadal', cidade: 'Curitiba', estado: 'PR', ativo: false}
  ];

}
