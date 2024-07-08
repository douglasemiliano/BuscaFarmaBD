package com.buscaFarma.buscaFarma.controller;

import com.buscaFarma.buscaFarma.exception.CustomException;
import com.buscaFarma.buscaFarma.model.Farmacia;
import com.buscaFarma.buscaFarma.repository.FarmaciaRepository;
import com.buscaFarma.buscaFarma.service.FarmaciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/farmacias")
@Tag(name="Farmacias", description = "API para gerenciamento das farmácias populares")
public class FarmaciaController {

    @Autowired
    private FarmaciaRepository farmaciaRepository;

    @Autowired
    private FarmaciaService farmaciaService;

    @GetMapping()
    public List<Farmacia> getFarmacia() {
        return farmaciaRepository.findAllItems();

    }
    @GetMapping("/busca")
    @Operation(summary = "Buscar farmacias por filtros", description = "Busca as farmacias por bairro, municipio e estado")
    public List<Farmacia> getFarmaciaByMunicipioEstado(@RequestParam(name = "bairro") String bairro, @RequestParam(name = "municipio") String municipio, @RequestParam(name="estado") String estado) {
        List<Farmacia> farmacias;
        if (!bairro.isEmpty() && !municipio.isEmpty() && !estado.isEmpty() ) {
            farmacias = farmaciaRepository.buscarPorBairroMunicipioEstado(bairro, municipio,estado);
        } else if (bairro.isEmpty() && !municipio.isEmpty() && !estado.isEmpty()) {
            farmacias = farmaciaRepository.buscarPorMunicipioEstado(municipio,estado);
        } else if (bairro.isEmpty() && municipio.isEmpty() && !estado.isEmpty()) {
            farmacias = farmaciaRepository.buscarPorEstado(estado);
        } else {
            return null;
        }
        if(farmacias.size() == 0) {
            throw new CustomException("Nenhum dado encontrado");
        }
        return farmacias;
    }

    @GetMapping("/proximas")
    @Operation(summary = "Recupera farmácias próximas", description = "Recupera as farmácias mais proximas a um determinado dado geográfico")
    public List<Farmacia> getNearbyFarmacias(@RequestParam double latitude, @RequestParam double longitude, @RequestParam double raioKm) {
        return farmaciaService.findNearbyFarmacias(latitude, longitude, raioKm);
    }

    @PostMapping()
    @Operation(summary = "Inserir uma farmácia", description = "Insere uma farmácia na collection")
    public Farmacia avaliar(@RequestBody Farmacia farmacia) {
        this.farmaciaService.salvarFarmacia(farmacia);
        return farmacia;
    }

}
