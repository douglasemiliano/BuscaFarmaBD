import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Subscription } from 'rxjs';
import { GeoService } from 'src/app/services/geo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { Farmacia } from 'src/app/models/farmacia';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements AfterViewInit, OnInit, OnDestroy {

  isControlsOpened = false;
  lat: number = 0;
  long: number = 0;
  farmacias: any[];
  contadorFarmacias: number = 0;
  posicaoUsuario: number[]

  fabOpcao1: boolean;
  @Input() receberFab1: any;  
  @ViewChild(MapaComponent) mapaComponent: MapaComponent;

  private farmaciasSubscription: Subscription;

   constructor(private appService: AppService, 
    private farmaciaService: FarmaciaService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef) {
  }
  
  ngAfterViewInit(): void {
    if(this.mapaComponent){
      this.mapaComponent.addMarkers(this.farmacias);
      if(this.farmacias){
        this.long = this.farmacias[0].coordenadaGeo.coordinates[0];
        this.lat = this.farmacias[0].coordenadaGeo.coordinates[1];
      }
      this.mapaComponent.updateSize();
      this.carregarMapa();
      this.getCurrentLocation();
    }
  }

  reberEventoMelhorAvaliadasClick(){
    console.log("melhor avaliadas");
  }

  ordenarPorDistancia(){
    for (let farmacia of this.farmacias) {
      farmacia.distance = this.calculateDistance(farmacia.coordenadaGeo.coordinates[0], farmacia.coordenadaGeo.coordinates[1])
    }
    this.farmacias.sort((a, b) => a.distance - b.distance);
  }

  limparFiltros(){
      this.farmacias.sort((a, b) => a.id.localeCompare(b.id));
  }

  ngOnInit(): void {
    this.farmaciasSubscription = this.farmaciaService.farmacias.subscribe((data: any) => {
      this.farmacias = data;
      if(this.mapaComponent){
        this.long = data[0].coordenadaGeo.coordinates[0];
        this.lat = data[0].coordenadaGeo.coordinates[1];
        this.mapaComponent.addMarkers(this.farmacias);
        this.mapaComponent.updateView([ this.long, this.lat]);   
      }  
    });
  }

  public voltar(){
    this.location.back()
  }

  ngOnDestroy(): void {
    this.farmaciasSubscription.unsubscribe();
  }

  openControls(): void {
  }

  getCurrentLocation() {
    this.farmaciaService.localizacaoUsuario.subscribe(data => {
      this.posicaoUsuario = data;
      this.cdr.detectChanges();
    });
   }

   public carregarMapa(){    
    this.mapaComponent.updateView([ this.long, this.lat]);
    this.mapaComponent.setTileSource();
    this.mapaComponent.updateSize();
   }

   public goToMaps(longLat: any[]){
     let url = `https://www.google.com/maps?q=${longLat[1]},${longLat[0]}`;
    window.open(url, '_blank');
   }

   public goToDetails(farmacia: Farmacia){
    this.farmaciaService.setFarmaciaAtual(farmacia);
    this.router.navigate(["detalhes"])
   }

   calculateDistance(lat2: number, lon2: number): string {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - this.posicaoUsuario[0]); // Diferença de latitude em radianos
    const dLon = this.deg2rad(lon2 - this.posicaoUsuario[1]); // Diferença de longitude em radianos
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.posicaoUsuario[0])) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em km
    return distance.toFixed(2);
  }

  // Método auxiliar para converter graus em radianos
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  

}
