package com.buscaFarma.buscaFarma.service;

import com.buscaFarma.buscaFarma.model.Farmacia;
import com.buscaFarma.buscaFarma.repository.FarmaciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnderecoService {

    @Autowired
    private FarmaciaRepository farmaciaRepository;


    public List<String> findMunicipiosByEstado(String estado) {
        List<Farmacia> farmacias = farmaciaRepository.findMunicipiosByEstado(estado);
        return farmacias.stream()
                .map(Farmacia::getMunicipio)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> findBairrosByEstadoAndMunicipio(String estado, String municipio) {
        List<Farmacia> farmacias = farmaciaRepository.findBairrosByEstadoAndMunicipio(estado, municipio);
        return farmacias.stream()
                .map(f -> f.getEndereco().getBairro())
                .distinct()
                .collect(Collectors.toList());
    }
}
