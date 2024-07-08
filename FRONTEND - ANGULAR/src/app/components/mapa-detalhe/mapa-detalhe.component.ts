import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import FullScreen from 'ol/control/FullScreen';
import Attribution from 'ol/control/Attribution';
import OsmSource from 'ol/source/OSM';
import StamenSource from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions, PinchZoom } from 'ol/interaction';
import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Farmacia } from 'src/app/models/farmacia';
import { ModalService } from 'src/app/services/modal.service';
import { Vector } from 'src/app/models/vector';
import LineString from 'ol/geom/LineString';
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'app-mapa-detalhe',
  templateUrl: './mapa-detalhe.component.html',
  styleUrls: ['./mapa-detalhe.component.scss']
})
export class MapaDetalheComponent {
  farmacias = []

  tileSources = [
    { name: 'None', source: null },
    { name: 'OSM', source: new OsmSource() },
    { name: 'Stamen', source: new StamenSource({ layer: 'toner' }) }
  ];

  selectedTileSource = this.tileSources[1];
  vectorSources: Vector[] = [];

  public map: Map;
  private readonly tileLayer: TileLayer<OsmSource>;
  private readonly vectorLayer: VectorLayer<any>;
  private readonly extent = [813079.7791264898, 5929220.284081122, 848966.9639063801, 5936863.986909639];
  iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png',
      scale: 0.10, // Escala para 50%
    })
  });

  iconPessoa = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'https://cdn-icons-png.flaticon.com/512/566/566499.png',
      scale: 0.10, // Escala para 50%
    })
  });


  constructor(private modalService: ModalService) {

    this.tileLayer = new TileLayer({ source: new OsmSource() });
    this.vectorLayer = new VectorLayer({ source: new VectorSource() });

    this.map = new Map({
      interactions: defaultInteractions().extend([
        new PinchZoom()
      ]),
      layers: [
        this.tileLayer,
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([-34.9282295, -8.1697316]),
        zoom: 10,
        constrainResolution: true
      })
    });
    
  }

    /**
   * Adiciona marcadores ao mapa.
   * @param markers Lista de marcadores com nome e lonLat.
   */
    addMarkers(localizacaoAtual: any, LocalizacaoDesejada: any): void {

          const pinLocalizacaoAtual = new Feature({
            coordenadas: localizacaoAtual,
            type: Point,
            geometry: new Point(fromLonLat(localizacaoAtual))
          });
          pinLocalizacaoAtual.setStyle(this.iconPessoa);

          const pinLocalizacaoDesejada = new Feature({
            coordenadas: LocalizacaoDesejada,
            type: Point,
            geometry: new Point(fromLonLat(LocalizacaoDesejada))
          });
          pinLocalizacaoDesejada.setStyle(this.iconStyle);
          
          
          this.vectorLayer.getSource().addFeature(pinLocalizacaoAtual);
          this.vectorLayer.getSource().addFeature(pinLocalizacaoDesejada);


    const line = new LineString([
      fromLonLat(localizacaoAtual),
      fromLonLat(LocalizacaoDesejada)
    ]);
    

    
    const lineFeature = new Feature({
      geometry: line
    });
    
    // Estilo personalizado para a linha
    const lineStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 4 // Espessura da linha em pixels
      })
    });

    lineFeature.setStyle(lineStyle);

    this.vectorLayer.getSource().addFeature(lineFeature);
    }

  /**
   * Updates zoom and center of the view.
   * @param zoom Zoom.
   * @param center Center in long/lat.
   */
  updateView(localizacao: any[]): void {        
    this.map.getView().setZoom(20);
    this.map.getView().setCenter(fromLonLat(localizacao));
  }

  /**
   * Updates target and size of the map.
   * @param target HTML container.
   */
  updateSize(target = 'mapa'): void {
    this.map.setTarget(target);
    this.map.updateSize();
  }

  /**
   * Sets the source of the tile layer.
   * @param source Source.
   */
  setTileSource(source = this.selectedTileSource): void {
    this.selectedTileSource = source;
    this.tileLayer.setSource(source.source);
  }

  /**
   * Sets the source of the vector layer.
   * @param source Source.
   */
  setVectorSource(source: Vector): void {
    this.vectorLayer.setSource(source.source);
    this.map.getView().fit(this.vectorLayer.getSource().getExtent());
  }
}
