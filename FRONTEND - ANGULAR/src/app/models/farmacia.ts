import { Avaliacao } from "./avaliacao";

export class Farmacia {
  id: string;
  numeroCNPJ: string;
  nomeFantasia: string;
  municipio: string;
  telefone: string[];
  coordenadaGeo: CoordenadaGeo;
  endereco: Endereco;
}

export interface CoordenadaGeo {
  type: string,
  coordinates: number[]
}

export interface Endereco {
    rua: string,
    numero: string,
    bairro: string
}


