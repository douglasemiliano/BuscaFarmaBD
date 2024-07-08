package com.buscaFarma.buscaFarma.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@ToString
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AvaliacaoClienteRank {
    private LocalDateTime dataPreenchimento;
    private Boolean marcadorAnonimo;
    private Integer valor;
    private String numeroDocumento;
}

