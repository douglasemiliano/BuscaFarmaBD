import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TesteComponent } from '../components/teste/teste.component';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptorService implements HttpInterceptor {

  constructor(private modalService: ModalService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.modalService.openLoading();
    return next.handle(req).pipe(finalize(
      () => 
      this.modalService.close()));
  }
}