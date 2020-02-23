import { EnderecoDTO } from './endereco.dto';
export interface PessoaDTO {
  nome: string;
  endereco: EnderecoDTO;
  ativo: boolean;
}
