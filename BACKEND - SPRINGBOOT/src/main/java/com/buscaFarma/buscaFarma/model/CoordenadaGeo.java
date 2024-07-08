package com.buscaFarma.buscaFarma.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Farmacia")
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CoordenadaGeo {
    private String type;
    private List<Double> coordinates;
}