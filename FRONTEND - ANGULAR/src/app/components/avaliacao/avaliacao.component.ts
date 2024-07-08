import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Avaliacao } from 'src/app/models/avaliacao';
import { Farmacia } from 'src/app/models/farmacia';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {


  nota: FormControl = new FormControl();

  avaliacaoForm: FormGroup;

  atendimentoForm: FormGroup;
  produtoForm: FormGroup;
  comentario: FormControl = new FormControl("", [Validators.required]);

  patologia: string;
  public marcadorAnonimo: boolean = false;

  informacoesForm: FormGroup;
  rating: number = 0;
  medicationControl = new FormControl();
  filteredMedications: Observable<any[]>;

  farmacia: Farmacia;
  avaliacoes: Avaliacao [] = [];

  patternCpf = Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);

  medications: any[] = [
    { name: 'Atenolol 25mg', indication: 'Hipertensão' },
    { name: 'Besilato de Anlodipino 5mg', indication: 'Hipertensão' },
    { name: 'Captopril 25mg', indication: 'Hipertensão' },
    { name: 'Cloridrato de Propranolol 40mg', indication: 'Hipertensão' },
    { name: 'Espironolactona 25mg', indication: 'Insuficiência cardíaca' },
    { name: 'Furosemida 40mg', indication: 'Edema' },
    { name: 'Hidroclorotiazida 25mg', indication: 'Hipertensão' },
    { name: 'Losartana Potássica 50mg', indication: 'Hipertensão' },
    { name: 'Maleato de Enalapril 10mg', indication: 'Hipertensão' },
    { name: 'Succinato de Metoprolol 25mg', indication: 'Hipertensão' },
    { name: 'Cloridrato de Metformina 500mg', indication: 'Diabetes' },
    { name: 'Cloridrato de Metformina 850mg', indication: 'Diabetes' },
    { name: 'Glibenclamida 5mg', indication: 'Diabetes' },
    { name: 'Insulina Humana 100UI/ML', indication: 'Diabetes' },
    { name: 'Brometo de Ipratrópio 0,02mg', indication: 'Asma' },
    { name: 'Brometo de Ipratrópio 0,25mg', indication: 'Asma' },
    { name: 'Dipropionato de Beclometasona 200mcg', indication: 'Asma' },
    { name: 'Dipropionato de Beclometasona 250mcg', indication: 'Asma' },
    { name: 'Dipropionato de Beclometasona 50mcg', indication: 'Asma' },
    { name: 'Sulfato de Salbutamol 100mcg', indication: 'Asma' },
    { name: 'Sulfato de Salbutamol 5mg', indication: 'Asma' },
    { name: 'Acetato de Medroxiprogesterona 150mg', indication: 'Contracepção' },
    { name: 'Etinilestradiol 0,03mg + Levonorgestrel 0,15mg - 3 Cartelas com 21 Comprimidos', indication: 'Contracepção' },
    { name: 'Etinilestradiol 0,03mg + Levonorgestrel 0,15mg - Cartela com 21 Comprimidos', indication: 'Contracepção' },
    { name: 'Noretisterona 0,35mg', indication: 'Contracepção' },
    { name: 'Valerato de Estradiol 5mg + Enantato de Noretisterona 50mg', indication: 'Contracepção' },
    { name: 'Alendronato de Sódio 70mg', indication: 'Osteoporose' },
    { name: 'Absorvente', indication: 'Dignidade Menstrual' }
  ];
  
  selectedMedications: any[] = [];

  constructor(private fb: FormBuilder, private service: FarmaciaService, private router: Router, private modalService: ModalService) {}

  ngOnInit() {
    this.service.farmaciaAtual.subscribe( {
      next: (farmacia: Farmacia | null) => {
        if(farmacia) {
          this.farmacia = farmacia;
        }
      }, error : (error: any) => {
        console.log(error);
      }
    })
    this.iniciarFormularios();
    }
  
  iniciarFormularios() {
    this.atendimentoForm = this.fb.group({
      houveFila: new FormControl("", [Validators.required]),
      horarioAtendimento: new FormControl("", [Validators.required]),
      tipoAdquirido: new FormControl("", [Validators.required]),
      qualidadeAtendimento: new FormControl("", [Validators.required]),
    });

    this.produtoForm = this.fb.group({
      principioAtivo: new FormControl("", [Validators.required]),
      patologia: new FormControl("", [Validators.required]),
      modalidade: new FormControl("GRATUIDADE", [Validators.required]),
    });

    this.informacoesForm = this.fb.group({
      genero: new FormControl("", [Validators.required]),
      dataNascimento: new FormControl("", [Validators.required]),
      rg: new FormControl("", [Validators.required]),
      anonimo: new FormControl("", Validators.required)
    })
  }

  onRatingChanged(nota: number) {
    this.rating = nota;
    this.nota.setValue(nota);
    this.crateAvaliacao();
  }

  crateAvaliacao(): Avaliacao{
    let avaliacao: Avaliacao = new Avaliacao();
    avaliacao.setId(this.farmacia.id);
    avaliacao.setNumeroCnpj(this.farmacia.numeroCNPJ)
    avaliacao.setNota(this.rating);
    avaliacao.setHouveFila(true ? this.atendimentoForm.get("houveFila")?.value === "true": false);
    avaliacao.setHorarioAtendimento(this.atendimentoForm.get("horarioAtendimento")?.value)
    avaliacao.setTipoAdquirido(this.atendimentoForm.get("tipoAdquirido")?.value)
    avaliacao.setQualidadeAtendimento(this.atendimentoForm.get("qualidadeAtendimento")?.value)
    avaliacao.setDataAvaliacao(new Date().toISOString()); 
    avaliacao.setPrincipioAtivo(this.produtoForm.get("principioAtivo")?.value);
    avaliacao.setPatologia(this.produtoForm.get("patologia")?.value);
    avaliacao.setTipoModalidade(this.produtoForm.get("modalidade")?.value);
    avaliacao.setComentario(this.comentario.value);
    avaliacao.setNumeroDocumento(this.informacoesForm.get("rg")?.value);
    if (this.informacoesForm.get("rg")?.value) {
      avaliacao.setMarcadorAnonimo(false);
    } else {
      avaliacao.setMarcadorAnonimo(true);
    }

    return avaliacao;
  }

  public onSubmit(){
    this.service.avaliar(this.crateAvaliacao(), this.farmacia.id).subscribe({
      next: data => {
        this.modalService.modalSucesso("Avaliação realizada com sucesso!");
        this.router.navigateByUrl("/home");
      }, error: error => {
        this.modalService.modalAlerta(error.error.text)
      }
    })
  }

   selecionarPatologia(event: Event){
    let listanova = this.medications.filter( item => item.name === event)
    this.patologia = listanova[0].indication;
    this.produtoForm.get("patologia")?.setValue(listanova[0].indication)
  }


}
