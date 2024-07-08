package com.buscaFarma.buscaFarma.repository;

import com.buscaFarma.buscaFarma.model.Farmacia;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FarmaciaRepository extends MongoRepository<Farmacia, String> {
    // Métodos adicionais de consulta, se necessário
    @Query(value = "{}")
    List<Farmacia> findAllItems();

    @Query("{ 'estado' : ?0 }")
    List<Farmacia> buscarPorEstado(String estado);

    @Query("{'municipio': ?0, 'estado': ?1}")
    List<Farmacia> buscarPorMunicipioEstado(String municipio, String estado);

    @Query("{'endereco.bairro': ?0, 'municipio': ?1, 'estado': ?2}")
    List<Farmacia> buscarPorBairroMunicipioEstado(String bairro, String municipio, String estado);

    @Query(value = "aggregate([" +
            "  { $match: { numeroCNPJ: ?0 } }," +
            "  { $lookup: { from: 'AvaliacaoCmt', localField: 'numeroCNPJ', foreignField: 'numeroCNPJ', as: 'avaliacaoCmt' } }," +
            "  { $lookup: { from: 'AvaliacaoPrd', localField: 'numeroCNPJ', foreignField: 'numeroCNPJ', as: 'avaliacaoPrd' } }," +
            "  { $lookup: { from: 'AvaliacaoRnk', localField: 'numeroCNPJ', foreignField: 'numeroCNPJ', as: 'avaliacaoRnk' } }," +
            "  { $lookup: { from: 'AvaliacaoATD', localField: 'numeroCNPJ', foreignField: 'numeroCNPJ', as: 'avaliacaoATD' } }" +
            "])")
    List<Farmacia> buscarFarmaciasComAvaliacao(String numeroCNPJ);

    @Query("{ 'coordenadaGeo' : { $geoWithin: { $centerSphere: [ [ ?0, ?1 ], ?2 ] } } }")
    List<Farmacia> findByLocationWithin(double longitude, double latitude, double radius);

    @Query(value="{ 'estado' : ?0 }", fields="{ 'municipio' : 1 }")
    List<Farmacia> findMunicipiosByEstado(String estado);

    @Query(value="{ 'estado' : ?0, 'municipio' : ?1 }", fields="{ 'endereco.bairro' : 1 }")
    List<Farmacia> findBairrosByEstadoAndMunicipio(String estado, String municipio);
}
