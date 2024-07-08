import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Estado } from 'src/app/models/estado';
import { FarmaciaService } from 'src/app/services/farmacia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  step: number = 1;
  tipoBusca: string = "estado";
  selected: any;

  latitude: number;
  longitude: number;

  estados: Estado[] = [
    { estado: "Acre", uf: "AC" },
    { estado: "Alagoas", uf: "AL" },
    { estado: "Amapá", uf: "AP" },
    { estado: "Amazonas", uf: "AM" },
    { estado: "Bahia", uf: "BA" },
    { estado: "Ceará", uf: "CE" },
    { estado: "Distrito Federal", uf: "DF" },
    { estado: "Espírito Santo", uf: "ES" },
    { estado: "Goiás", uf: "GO" },
    { estado: "Maranhão", uf: "MA" },
    { estado: "Mato Grosso", uf: "MT" },
    { estado: "Mato Grosso do Sul", uf: "MS" },
    { estado: "Minas Gerais", uf: "MG" },
    { estado: "Pará", uf: "PA" },
    { estado: "Paraíba", uf: "PB" },
    { estado: "Paraná", uf: "PR" },
    { estado: "Pernambuco", uf: "PE" },
    { estado: "Piauí", uf: "PI" },
    { estado: "Rio de Janeiro", uf: "RJ" },
    { estado: "Rio Grande do Norte", uf: "RN" },
    { estado: "Rio Grande do Sul", uf: "RS" },
    { estado: "Rondônia", uf: "RO" },
    { estado: "Roraima", uf: "RR" },
    { estado: "Santa Catarina", uf: "SC" },
    { estado: "São Paulo", uf: "SP" },
    { estado: "Sergipe", uf: "SE" },
    { estado: "Tocantins", uf: "TO" }
  ];

  municipios: string[] = []
  municipiosFiltrados: Observable<string[]>;
  bairros: string[] = [];

  pesquisa: FormControl = new FormControl(null, [Validators.required])
  estado: FormControl = new FormControl(null, [Validators.required])
  municipio: FormControl = new FormControl(null, [Validators.required])
  bairro: FormControl = new FormControl(null, [Validators.required])




  constructor(private farmaciaService: FarmaciaService) {
    this.getCurrentLocation();
  }

  public ngOnInit(): void {
  }

  public buscarMunicipiosPorEstado(UF: string) {
    this.farmaciaService.buscarMunicipiosPorUF(UF);
  }

  public carregarBairro(municipio: string){
    this.farmaciaService.buscarBairroPorUFeMunicipio(this.estado.value, municipio).subscribe({
      next: (data => {
        this.bairros = data;
      })
    })

    
  }

  onSubmit() {
    switch (this.tipoBusca) {
      case "estado":
        this.farmaciaService.buscarFarmacia("", "", this.estado.value.toUpperCase());
        break
      case "municipio":
        this.farmaciaService.buscarFarmacia("", this.normalizarString(this.pesquisa.value), this.estado.value.toUpperCase());
        break
      case "farmacia":
        this.farmaciaService.buscarFarmacia("", "", this.normalizarString(this.pesquisa.value))
        break
        case "bairro":
          this.farmaciaService.buscarFarmacia(this.normalizarString(this.pesquisa.value), this.municipio.value, this.estado.value)
          break
    }
  }

  normalizarString(string: string): string {
    return string.toUpperCase().normalize('NFD').replace(/\p{Mn}/gu, "")
  }

  pesquisarPorProximidade(){
    if(this.latitude === undefined || this.longitude == undefined){{
      this.selecionarTipoBusca("proximidade");
    }} else {
      this.farmaciaService.buscarFarmaciasMaisProximas(this.latitude, this.longitude)
    }
  }

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.farmaciaService.setLocalizacaoUsuario([position.coords.latitude, position.coords.longitude])
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  public selecionarTipoBusca(tipoBusca: string) {
    this.tipoBusca = tipoBusca;
    this.step = this.step + 1;
  }

  public carregarMunicipios(UF: string) {
    this.farmaciaService.buscarMunicipiosPorUF(this.estado.value.toUpperCase()).subscribe({
      next: (data => {
        this.municipios = data;
        this.iniciarFiltro();
      })
    })
  }

  public voltarStep() {
    this.step = this.step - 1;
  }


  iniciarFiltro() {
    this.municipiosFiltrados = this.pesquisa.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.municipios.filter(municipio => municipio.toLowerCase().includes(filterValue));
  }

}
