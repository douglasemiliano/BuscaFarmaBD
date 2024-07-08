package com.buscaFarma.buscaFarma.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AvaliacaoClienteComentario {
    private LocalDateTime dataPreenchimento;
    private Boolean marcadorAnonimo;
    private String texto;
    private String numeroDocumento;
}

