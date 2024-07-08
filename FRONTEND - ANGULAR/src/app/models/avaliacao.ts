export class Avaliacao {
  id: string;
  numeroCNPJ: string;
  marcadorAnonimo: boolean;
  numeroDocumento: string;
  houveFila: boolean;
  horarioAtendimento: string;
  comentario: string;
  dataAvaliacao: string;
  principioAtivo: string;
  patologia: string;
  tipoModalidade: string;
  nota: number;
  rating: number;
  qualidadeAtendimento: string;
  tipoAdquirido: string;

  constructor() {}

  getId(): string {
    return this.id;
  }

  setId(value: string) {
    this.id = value;
  }

  getNumeroCnpj(): string {
    return this.numeroCNPJ;
  }

  setNumeroCnpj(value: string) {
    this.numeroCNPJ = value;
  }

  getMarcadorAnonimo(): boolean {
    return this.marcadorAnonimo;
  }

  setMarcadorAnonimo(value: boolean) {
    this.marcadorAnonimo = value;
  }

  getNumeroDocumento(): string {
    return this.numeroDocumento;
  }

  setNumeroDocumento(value: string) {
    this.numeroDocumento = value;
  }

  getHouveFila(): boolean {
    return this.houveFila;
  }

  setHouveFila(value: boolean) {
    this.houveFila = value;
  }

  getHorarioAtendimento(): string {
    return this.horarioAtendimento;
  }

  setHorarioAtendimento(value: string) {
    this.horarioAtendimento = value;
  }

  getComentario(): string {
    return this.comentario;
  }

  setComentario(value: string) {
    this.comentario = value;
  }

  getDataAvaliacao(): string {
    return this.dataAvaliacao;
  }

  setDataAvaliacao(value: string) {
    this.dataAvaliacao = value;
  }

  getPrincipioAtivo(): string {
    return this.principioAtivo;
  }

  setPrincipioAtivo(value: string) {
    this.principioAtivo = value;
  }

  getPatologia(): string {
    return this.patologia;
  }

  setPatologia(value: string) {
    this.patologia = value;
  }

  getTipoModalidade(): string {
    return this.tipoModalidade;
  }

  setTipoModalidade(value: string) {
    this.tipoModalidade = value;
  }

  getNota(): number {
    return this.nota;
  }

  setNota(value: number) {
    this.nota = value;
  }

  getRating(): number {
    return this.rating;
  }

  setRating(value: number) {
    this.rating = value;
  }

  getQualidadeAtendimento(): string {
    return this.qualidadeAtendimento;
  }

  setQualidadeAtendimento(value: string) {
    this.qualidadeAtendimento = value;
  }

  getTipoAdquirido(): string {
    return this.tipoAdquirido;
  }

  setTipoAdquirido(value: string) {
    this.tipoAdquirido = value;
  }
}
