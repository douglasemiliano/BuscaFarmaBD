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
public class AvaliacaoClienteATD {
    private LocalDateTime dataPreenchimento;
    private Boolean marcadorAnonimo;
    private Boolean houveFila;
    private String horarioAtendimento;
    private String numeroDocumento;
    private String qualidadeAtendimento;
    private String tipoAdquirido;
}

