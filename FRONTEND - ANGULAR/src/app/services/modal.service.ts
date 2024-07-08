import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TesteComponent } from '../components/teste/teste.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ModalAlertaComponent } from '../shared/modal-alerta/modal-alerta.component';
import { ModalSucessoComponent } from '../shared/modal-sucesso/modal-sucesso.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private dialogRef: MatDialogRef<LoadingComponent>;
  private dialogRefAlerta: MatDialogRef<ModalAlertaComponent>;
  private dialogRefMapa: MatDialogRef<TesteComponent>;
  public dialogRefSucesso: MatDialogRef<ModalSucessoComponent>;

  constructor(public dialog: MatDialog) { }

  openDialog(dados: any): void {
    this.dialogRefMapa = this.dialog.open(TesteComponent, {
      disableClose: true,
      data: {
        dados: dados
      }
    });
  }

  closeMapa(){
    this.dialogRefMapa.close();
  }

  openLoading() {
    this.dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
  }

  close(){
    this.dialogRef.close();
  }

  closeModalSucesso(){
    this.dialogRefSucesso.close();
  }

  modalAlerta(texto: string) {
    this.dialogRefAlerta = this.dialog.open(ModalAlertaComponent, {
      data: {
        texto: texto
      }
    });
  }

  modalSucesso(texto: string) {
    this.dialogRefSucesso = this.dialog.open(ModalSucessoComponent, {
      data: {
        texto: texto
      }
    });

    this.dialogRefSucesso.afterOpened().subscribe( data => {
      setTimeout(() => {
        this.dialogRefSucesso.close();
      }, 2000);
    })
  }
}