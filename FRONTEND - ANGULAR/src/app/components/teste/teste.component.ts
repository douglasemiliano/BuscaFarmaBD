import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ModalService } from 'src/app/services/modal.service';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent {

  public nomeFarmacia: string = ""; 
  public enderecoFarmacia: any;
  public farmacia: any;
  posicaoUsuario: any = {
    longLat: []
  }
  avaliacao: any;
  private subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private modalService: ModalService, private farmaciaService: FarmaciaService) {
    // this.nomeFarmacia = data.dados.nome;
    // this.enderecoFarmacia = data.dados.endereco
    this.farmacia = data.dados;
    this.getCurrentLocation();
    console.log(this.farmacia);
    
  }

  getCurrentLocation() {
    this.subscription = this.farmaciaService.localizacaoUsuario.subscribe(data => {
      this.posicaoUsuario.longLat = data;
    });
   }

  close(){
    this.modalService.closeMapa();
  }

  public goToMaps(longLat: any[]){
    console.log(longLat);
    
    let url = `https://www.google.com/maps?q=${longLat[1]},${longLat[0]}`;
   window.open(url, '_blank');
  }

  calculateDistance(lat2: number, lon2: number): string {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - this.posicaoUsuario.longLat[0]); // Diferença de latitude em radianos
    const dLon = this.deg2rad(lon2 - this.posicaoUsuario.longLat[1]); // Diferença de longitude em radianos
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.posicaoUsuario.longLat[0])) * Math.cos(this.deg2rad(lat2)) *
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
