package com.buscaFarma.buscaFarma.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buscaFarma.buscaFarma.model.Endereco;
import com.buscaFarma.buscaFarma.service.EnderecoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/enderecos")
@Tag(name="Endereços", description = "API para gerenciamento de endereços")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;


    @GetMapping("/municipios/{estado}")
    @Operation(summary = "Buscar municípios por estado", description = "Retorna todos os municípios de um determinado estado")
    public List<String> buscarMunicipiosPorEstado(@PathVariable String estado) {
        return enderecoService.findMunicipiosByEstado(estado);
    }

    @GetMapping("/bairros/{estado}/{municipio}")
    @Operation(summary = "Buscar bairros por município e estado", description = "Retorna todos os bairros de um determinado município de um estado")
    public List<String> buscarBairrosPorMunicipioEEstado(@PathVariable String estado, @PathVariable String municipio) {
        return enderecoService.findBairrosByEstadoAndMunicipio(estado, municipio);
    }
}
