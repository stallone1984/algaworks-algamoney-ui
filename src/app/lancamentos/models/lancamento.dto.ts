export interface LancamentoDTO {
    codigo: number;
    tipo: string;
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    pessoa: string;
}
