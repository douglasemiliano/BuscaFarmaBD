import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OsmSource from 'ol/source/OSM';
import StamenSource from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultInteractions, PinchZoom } from 'ol/interaction';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { ModalService } from 'src/app/services/modal.service';
import { Vector } from 'src/app/models/vector';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {
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
    
    this.addMarkers(this.farmacias);
  }

    /**
   * Adiciona marcadores ao mapa.
   * @param markers Lista de marcadores com nome e lonLat.
   */
    addMarkers(markers: any[]): void {
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png',
          scale: 0.10, // Escala para 50%
        })
      });
  
      if (markers && markers.length > 0) {
        markers.forEach((marker: any) => {
          const pinFeature = new Feature({
            farmacia: marker,
            type: Point,
            geometry: new Point(fromLonLat(marker.coordenadaGeo.coordinates))
          });
  
          pinFeature.setStyle(iconStyle);
  
          this.vectorLayer.getSource().addFeature(pinFeature);
        });

        
        this.map.on('click', (e)=>{
          let features: any[] = this.map.getFeaturesAtPixel(e.pixel);
  
          if (features.length > 0){
            this.modalService.openDialog(features[0].values_.farmacia,)
          }
          
          
        })

      }
    }

  /**
   * Updates zoom and center of the view.
   * @param zoom Zoom.
   * @param center Center in long/lat.
   */
  updateView(localizacao: any[]): void {        
    this.map.getView().setZoom(10);
    this.map.getView().setCenter(fromLonLat(localizacao));
  }

  /**
   * Updates target and size of the map.
   * @param target HTML container.
   */
  updateSize(target = 'map'): void {
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
