import { PessoaDTO } from './pessoa.dto';

export interface LancamentoDTO {
    tipo: string;
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    pessoa: string;
}