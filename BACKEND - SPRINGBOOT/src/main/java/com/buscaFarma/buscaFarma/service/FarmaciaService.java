package com.buscaFarma.buscaFarma.service;

import com.buscaFarma.buscaFarma.model.*;
import com.buscaFarma.buscaFarma.repository.FarmaciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmaciaService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private FarmaciaRepository farmaciaRepository;

//    public List<AvaliacaoCompletaDTO> executarAgregacao(String cnpj) {
//        return mongoTemplate.aggregate(
//                Aggregation.newAggregation(
//                        Aggregation.match(Criteria.where("numeroCNPJ").is(cnpj)),
//                        Aggregation.lookup("AvaliacaoCmt", "numeroCNPJ", "numeroCNPJ", "avaliacaoCmt"),
//                        Aggregation.lookup("AvaliacaoPrd", "numeroCNPJ", "numeroCNPJ", "avaliacaoPrd"),
//                        Aggregation.lookup("AvaliacaoRnk", "numeroCNPJ", "numeroCNPJ", "avaliacaoRnk"),
//                        Aggregation.lookup("AvaliacaoATD", "numeroCNPJ", "numeroCNPJ", "avaliacaoATD")
//                ),
//                "Farmacia",
//                AvaliacaoCompletaDTO.class
//        ).getMappedResults();
//    }


    public List<Farmacia> findNearbyFarmacias(double latitude, double longitude, double radiusKm) {
        double radiusInRadians = radiusKm / 6378.1; // Raio da Terra em km
        return farmaciaRepository.findByLocationWithin(longitude, latitude, radiusInRadians);
    }

    public Farmacia salvarFarmacia (Farmacia farmacia) {
        return this.mongoTemplate.insert(farmacia);
    }

}

