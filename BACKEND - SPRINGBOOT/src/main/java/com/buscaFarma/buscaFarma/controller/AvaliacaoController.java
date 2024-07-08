package com.buscaFarma.buscaFarma.controller;

import com.buscaFarma.buscaFarma.DTO.AvaliacaoDTO;
import com.buscaFarma.buscaFarma.DTO.AvaliacaoCompletaDTO;
import com.buscaFarma.buscaFarma.DTO.AvaliacaoResponseDTO;
import com.buscaFarma.buscaFarma.model.Produto;
import com.buscaFarma.buscaFarma.service.AvaliacaoService;
import com.buscaFarma.buscaFarma.service.FarmaciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacao")
@Tag(name="Avaliacao", description = "API para avaliação das farmácias populares")

public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostMapping("/{id}")
    @Operation(summary = "Avaliação de farmácias", description = "Avalia uma farmácia")
    public AvaliacaoDTO avaliar(@PathVariable String id, @RequestBody AvaliacaoDTO avaliacaoDTO) {
        return this.avaliacaoService.avaliar(id, avaliacaoDTO);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera avaliações por id da farmácia", description = "Recupera as avaliações processadas de uma farmacia utilizando o id")
    public AvaliacaoResponseDTO getAvaliacoesByIdFarmacia(@PathVariable String id) {
        return this.avaliacaoService.processarAvaliacoes(id);
    }


}
