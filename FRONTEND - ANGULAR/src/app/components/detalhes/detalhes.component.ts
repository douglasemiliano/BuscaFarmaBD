import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { Farmacia } from 'src/app/models/farmacia';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { MapaComponent } from '../mapa/mapa.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MapaDetalheComponent } from '../mapa-detalhe/mapa-detalhe.component';
import { Avaliacao } from 'src/app/models/avaliacao';
import { AvaliacaoResponseDTO } from 'src/app/models/AvaliacaoResponseDTO';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit, OnDestroy, AfterViewInit{

  lat: number;
  long: number;
  private subscription: Subscription
  private subscription2: Subscription
  public farmacia: any = {
    nome: 'Farmácia ABC',
    longLat: [ -34.865892424651,
      -7.119965784773],
    nomeFantasia: 'Farmácia da Esquina',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      municipio: 'Recife',
      estado: 'PE'
    },
    produtos: ['Medicamento A', 'Medicamento B', 'Medicamento C']
  };

  public localizacao: any = {
    longLat: []
  };

  posicaoUsuario: any = {
    longLat: []
  }

  posicao: number[];

  comentarios: string[] = []; // Lista de comentários
  comentario: FormControl =  new FormControl("", [Validators.required])

  produtos: string[] = [];
  avaliacoes: Avaliacao[] = [];
  rating: number = 0;
  public teste: number = 0;

  avaliacao: AvaliacaoResponseDTO;
  
  @ViewChild(MapaDetalheComponent) mapaComponent: MapaDetalheComponent;

  constructor(private farmaciaService: FarmaciaService, private router: Router, private activatedRoute: ActivatedRoute, private modalService: ModalService){
        // // Observa as mudanças de rota
        // this.router.events.pipe(
        //   filter(event => event instanceof NavigationEnd)
        // ).subscribe(() => {
        //   // Navega para a mesma rota
        //   this.router.navigate([this.activatedRoute.snapshot.url]);
        // });
  }


  ngAfterViewInit(): void {
    this.carregarMapa();
    if(this.mapaComponent){   
      this.mapaComponent.addMarkers(this.localizacao.longLat, this.farmacia.coordenadaGeo.coordinates);
      this.mapaComponent.updateView([ this.localizacao.longLat[0], this.localizacao.longLat[1]]);
    }
  }

  public enviarComentario() {
    this.comentarios.push(this.comentario.value);
    this.comentario.reset()
  }

  ngOnInit(): void {
    this.getCurrentLocation();
    this.localizacao.longLat = this.farmaciaService.localizacao;    
    this.subscription = this.farmaciaService.farmaciaAtual.subscribe( {
      next: (farmacia: Farmacia | any) => {
        if(farmacia) {
          this.farmacia = farmacia;
          this.avaliacoes = farmacia.avaliacoes ? farmacia.avaliacoes : [];
          this.separarProdutosFarmacia();
          this.calcularMediaDeRating();
          this.getAvaliacao(farmacia.id)
        }
      }, error : (error: any) => {
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
  public carregarMapa(){    
    this.mapaComponent.updateView([ this.farmacia?.coordenadaGeo.coordinates[1], this.farmacia?.coordenadaGeo.coordinates[0]]);
    this.mapaComponent.setTileSource();
    this.mapaComponent.updateSize();
   }

   getCurrentLocation() {
    this.subscription2 = this.farmaciaService.localizacaoUsuario.subscribe(data => {
      if (this.mapaComponent){
        this.mapaComponent.addMarkers(this.posicaoUsuario, null)
        this.mapaComponent.updateView(this.posicaoUsuario.longLat[0]);
;      }
      this.posicaoUsuario.longLat = data;
      this.posicao = data;
    })
   }

   goToAvaliacao(){
    this.router.navigateByUrl("/avaliacao")
   }

   public goToMaps(longLat: any[]){
    let url = `https://www.google.com/maps?q=${longLat[1]},${longLat[0]}`;
   window.open(url, '_blank');
  }

   separarProdutosFarmacia() {
    // for(let avaliacao of this.avaliacoes){
    //   this.produtos = this.produtos.concat(avaliacao);
    //   this.comentarios.push(avaliacao.comentario)
    // }
   }

   calcularMediaDeRating() {
    let listaRating: number[] = [];
    for(let avaliacao of this.avaliacoes){
      listaRating.push(avaliacao.rating);
    }
    let soma: number = listaRating.reduce((acumulador: number, elemento: number) => acumulador + elemento, 0);
    this.rating = soma / listaRating.length;
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

  private getAvaliacao(farmaciaId: string) {
    this.farmaciaService.getAvaliacao(farmaciaId).subscribe({
      next: (avaliacao: AvaliacaoResponseDTO | any) => {
        this.avaliacao = avaliacao;
      }
    });
  }
}
