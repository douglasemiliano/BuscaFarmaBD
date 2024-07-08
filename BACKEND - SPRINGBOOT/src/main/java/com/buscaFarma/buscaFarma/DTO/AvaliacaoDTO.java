package com.buscaFarma.buscaFarma.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class AvaliacaoDTO {
    private Boolean marcadorAnonimo;
    private Boolean houveFila;
    private String horarioAtendimento;
    private String numeroCNPJ;
    private String numeroDocumento;
    private String comentario;
    private LocalDateTime dataPreenchimento;
    private String principioAtivo;
    private String patologia;
    private String tipoModalidade;
    private Integer nota;
    private String qualidadeAtendimento;
    private String tipoAdquirido;
}
