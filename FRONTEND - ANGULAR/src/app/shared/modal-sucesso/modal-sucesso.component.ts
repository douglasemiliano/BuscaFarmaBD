import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-sucesso',
  templateUrl: './modal-sucesso.component.html',
  styleUrls: ['./modal-sucesso.component.scss']
})
export class ModalSucessoComponent {
  texto: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.texto = data.texto;
  }
}
