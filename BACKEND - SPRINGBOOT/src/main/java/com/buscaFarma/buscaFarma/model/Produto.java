package com.buscaFarma.buscaFarma.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Farmacia")
@ToString
@Getter
@Setter
@AllArgsConstructor
@Builder

public class Produto {
    private String principioAtivo;
    private String patologia;
    private LocalDateTime dataAvaliacao;
}
