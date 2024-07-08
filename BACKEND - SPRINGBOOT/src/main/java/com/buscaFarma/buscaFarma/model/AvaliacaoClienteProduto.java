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
public class AvaliacaoClienteProduto {
    private LocalDateTime dataPreenchimento;
    private Boolean marcadorAnonimo;
    private String principioAtivo;
    private String patologia;
    private String tipoModalidade;
    private String numeroDocumento;

}

