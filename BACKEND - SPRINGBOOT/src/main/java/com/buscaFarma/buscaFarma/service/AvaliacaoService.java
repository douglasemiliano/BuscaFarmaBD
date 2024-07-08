package com.buscaFarma.buscaFarma.service;

import com.buscaFarma.buscaFarma.DTO.AvaliacaoDTO;
import com.buscaFarma.buscaFarma.DTO.AvaliacaoCompletaDTO;
import com.buscaFarma.buscaFarma.DTO.AvaliacaoResponseDTO;
import com.buscaFarma.buscaFarma.exception.CustomException;
import com.buscaFarma.buscaFarma.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AvaliacaoService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public AvaliacaoDTO avaliar(String farmaciaId, AvaliacaoDTO avaliacaoDTO){

        avaliacaoDTO.setDataPreenchimento(LocalDateTime.now());
        AvaliacaoClienteProduto avaliacaoProduto = this.criarAvaliacaoProduto(avaliacaoDTO);
        AvaliacaoClienteATD avaliacaoAtendimento = this.criarAvaliacaoAtendimento(avaliacaoDTO);
        AvaliacaoClienteComentario avaliacaoComentario = this.criarAvaliacaoComentario(avaliacaoDTO);
        AvaliacaoClienteRank avaliacaoRanking = this.criarAvaliacaoRank(avaliacaoDTO);

        this.atualizarAvaliacaoProduto(farmaciaId, avaliacaoProduto);
        this.atualizarAvaliacaoATD(farmaciaId, avaliacaoAtendimento);
        this.atualizarAvaliacaoComentario(farmaciaId, avaliacaoComentario);
        this.atualizarAvaliacaoRank(farmaciaId, avaliacaoRanking);

        return avaliacaoDTO;
    }

    private AvaliacaoClienteProduto criarAvaliacaoProduto (AvaliacaoDTO avaliacaoDTO) {
        return AvaliacaoClienteProduto.builder()
                .dataPreenchimento(LocalDateTime.now())
                .marcadorAnonimo(avaliacaoDTO.getMarcadorAnonimo())
                .principioAtivo(avaliacaoDTO.getPrincipioAtivo())
                .patologia(avaliacaoDTO.getPatologia())
                .tipoModalidade(avaliacaoDTO.getTipoModalidade())
                .numeroDocumento(avaliacaoDTO.getNumeroDocumento())
                .build();
    }

    private AvaliacaoClienteATD criarAvaliacaoAtendimento (AvaliacaoDTO avaliacaoDTO) {
        return AvaliacaoClienteATD.builder()
                .dataPreenchimento(avaliacaoDTO.getDataPreenchimento())
                .marcadorAnonimo(avaliacaoDTO.getMarcadorAnonimo())
                .houveFila(avaliacaoDTO.getHouveFila())
                .horarioAtendimento(avaliacaoDTO.getHorarioAtendimento())
                .numeroDocumento(avaliacaoDTO.getNumeroDocumento())
                .qualidadeAtendimento(avaliacaoDTO.getQualidadeAtendimento())
                .tipoAdquirido(avaliacaoDTO.getTipoAdquirido())
                .build();
    }

    private AvaliacaoClienteComentario criarAvaliacaoComentario (AvaliacaoDTO avaliacaoDTO) {
        return AvaliacaoClienteComentario.builder()
                .dataPreenchimento(avaliacaoDTO.getDataPreenchimento())
                .marcadorAnonimo(avaliacaoDTO.getMarcadorAnonimo())
                .texto(avaliacaoDTO.getComentario())
                .numeroDocumento(avaliacaoDTO.getNumeroDocumento())
                .build();
    }

    private AvaliacaoClienteRank criarAvaliacaoRank (AvaliacaoDTO avaliacaoDTO) {
        return AvaliacaoClienteRank.builder()
                .dataPreenchimento(avaliacaoDTO.getDataPreenchimento())
                .marcadorAnonimo(avaliacaoDTO.getMarcadorAnonimo())
                .valor(avaliacaoDTO.getNota())
                .numeroDocumento(avaliacaoDTO.getNumeroDocumento())
                .build();
    }

    public void atualizarAvaliacaoProduto(String farmaciaId, AvaliacaoClienteProduto novaAvaliacao) {
        Query query = new Query(Criteria.where("id").is(farmaciaId));
        Update update = new Update().push("avaliacaoClienteProduto", novaAvaliacao);
        mongoTemplate.updateFirst(query, update, Farmacia.class);
    }

    public void atualizarAvaliacaoRank(String farmaciaId, AvaliacaoClienteRank novaAvaliacao) {
        Query query = new Query(Criteria.where("id").is(farmaciaId));
        Update update = new Update().push("avaliacaoClienteRank", novaAvaliacao);
        mongoTemplate.updateFirst(query, update, Farmacia.class);
    }

    public void atualizarAvaliacaoComentario(String farmaciaId, AvaliacaoClienteComentario novoComentario) {
        Query query = new Query(Criteria.where("id").is(farmaciaId));
        Update update = new Update().push("avaliacaoClienteComentario", novoComentario);
        mongoTemplate.updateFirst(query, update, Farmacia.class);
    }

    public void atualizarAvaliacaoATD(String farmaciaId, AvaliacaoClienteATD novaAvaliacao) {
        Query query = new Query(Criteria.where("id").is(farmaciaId));
        Update update = new Update().push("avaliacaoClienteATD", novaAvaliacao);
        mongoTemplate.updateFirst(query, update, Farmacia.class);
    }

    public Farmacia salvarFarmacia(Farmacia farmacia){
        this.mongoTemplate.insert(farmacia);
        return farmacia;
    }


    public AvaliacaoCompletaDTO buscarTodasAvaliacoesPorIdFarmacia(String farmaciaId) {
        Query query = new Query(Criteria.where("id").is(farmaciaId));
        query.fields().include("avaliacaoClienteProduto", "avaliacaoClienteRank", "avaliacaoClienteComentario", "avaliacaoClienteATD");
        Farmacia farmacia = mongoTemplate.findOne(query, Farmacia.class);

        if (farmacia != null) {
            return AvaliacaoCompletaDTO.builder()
                    .avaliacaoClienteProdutoList(farmacia.getAvaliacaoClienteProduto())
                    .avaliacaoClienteAtendimentoList(farmacia.getAvaliacaoClienteATD())
                    .avaliacaoClienteComentarioList(farmacia.getAvaliacaoClienteComentario())
                    .avaliacaoClienteRankList(farmacia.getAvaliacaoClienteRank())
                    .build();
        }


        return new AvaliacaoCompletaDTO();
    }

    public AvaliacaoResponseDTO processarAvaliacoes(String id) {
        AvaliacaoCompletaDTO avaliacaoCompletaDTO = buscarTodasAvaliacoesPorIdFarmacia(id);
        if(avaliacaoCompletaDTO.getAvaliacaoClienteProdutoList() == null || avaliacaoCompletaDTO.getAvaliacaoClienteAtendimentoList() == null ||
        avaliacaoCompletaDTO.getAvaliacaoClienteComentarioList() == null || avaliacaoCompletaDTO.getAvaliacaoClienteRankList() == null) {
            throw new CustomException("Nenhuma avaliação encontrada");
        }
        List<Produto> listaProdutos = getListaProduto(avaliacaoCompletaDTO.getAvaliacaoClienteProdutoList());
        double media = mediaRanking(avaliacaoCompletaDTO.getAvaliacaoClienteRankList());
        return AvaliacaoResponseDTO.builder()
                .produtos(listaProdutos)
                .comentarios(avaliacaoCompletaDTO.getAvaliacaoClienteComentarioList())
                .media(media)
                .build();
    }

    private double mediaRanking(List<AvaliacaoClienteRank> avaliacoes) {
        double soma = 0;

        for (AvaliacaoClienteRank avaliacao: avaliacoes) {
            soma += avaliacao.getValor();
        }

        BigDecimal media = new BigDecimal(soma / avaliacoes.size()).setScale(2, RoundingMode.HALF_UP);
        return media.doubleValue();
    }

    public static List<Produto> getListaProduto(List<AvaliacaoClienteProduto> avaliacoes) {
        Map<String, Produto> produtoMap = new HashMap<>();

        for (AvaliacaoClienteProduto avaliacao : avaliacoes) {
            String principioAtivo = avaliacao.getPrincipioAtivo();
            LocalDateTime dataPreenchimento = avaliacao.getDataPreenchimento();
            String patologia = avaliacao.getPatologia();

            // Se o princípio ativo já estiver no mapa, verifica se a nova avaliação é mais recente
            if (produtoMap.containsKey(principioAtivo)) {
                if (produtoMap.get(principioAtivo).getDataAvaliacao().isBefore(dataPreenchimento)) {
                    produtoMap.put(principioAtivo, new Produto(principioAtivo, patologia, dataPreenchimento));
                }
            } else {
                produtoMap.put(principioAtivo, new Produto(principioAtivo, patologia, dataPreenchimento));
            }
        }

        return new ArrayList<>(produtoMap.values());
    }

}

