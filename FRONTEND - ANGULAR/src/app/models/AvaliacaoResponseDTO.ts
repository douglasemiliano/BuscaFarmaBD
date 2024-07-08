export class AvaliacaoResponseDTO {
  produtos: Produto[];
  comentarios: AvaliacaoClienteComentario[];
  media: number;
}

export class Produto {
  principioAtivo: string;
  patologia: string;
  dataAvaliacao: Date;
}

export class AvaliacaoClienteComentario {
  dataPreenchimento: Date = new Date;
  marcadorAnonimo: boolean;
  texto: string;
  numeroDocumento: string;
}
