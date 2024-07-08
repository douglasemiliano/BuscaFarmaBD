package com.buscaFarma.buscaFarma.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Farmacia")
@ToString
@Getter
@Setter
@AllArgsConstructor
@Builder
public class Farmacia {
    @Id
    private String id;
    private String numeroCNPJ;
    private String nomeFantasia;
    private String municipio;
    private String estado;
    private List<String> telefone;
    private CoordenadaGeo coordenadaGeo;
    private Endereco endereco;
    private List<AvaliacaoClienteProduto> avaliacaoClienteProduto;
    private List<AvaliacaoClienteRank> avaliacaoClienteRank;
    private List<AvaliacaoClienteComentario> avaliacaoClienteComentario;
    private List<AvaliacaoClienteATD> avaliacaoClienteATD;

    // Getters e Setters
}