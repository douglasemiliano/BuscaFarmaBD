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
public class AvaliacaoCompletaDTO {
    List<AvaliacaoClienteProduto> avaliacaoClienteProdutoList;
    List<AvaliacaoClienteATD> avaliacaoClienteAtendimentoList;
    List<AvaliacaoClienteComentario> avaliacaoClienteComentarioList;
    List<AvaliacaoClienteRank> avaliacaoClienteRankList;
}
