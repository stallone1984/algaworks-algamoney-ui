export class PessoaCadastroDTO {
  nome: string;
  ativo = true;
  endereco = new EnderecoPessoaCadastroDTO();
}

export class EnderecoPessoaCadastroDTO {
  logradouro: string;
  numero: string;
  complemento?: string = null;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
