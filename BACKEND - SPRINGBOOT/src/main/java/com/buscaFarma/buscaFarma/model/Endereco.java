package com.buscaFarma.buscaFarma.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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

public class Endereco {
    private String rua;
    private String numero;
    private String bairro;
    // adição de variáveis
    private String municipio;
    private String estado;
}
