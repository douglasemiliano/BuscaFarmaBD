package com.buscaFarma.buscaFarma.DTO;

import com.buscaFarma.buscaFarma.model.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@Builder
public class AvaliacaoResponseDTO {
    List<Produto> produtos;
    List<AvaliacaoClienteComentario> comentarios;
    double media;
}
