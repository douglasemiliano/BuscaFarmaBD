import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.scss']
})
export class ModalAlertaComponent {

  texto: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.texto = data.texto;
  }

}
