import { AfterViewInit, Component } from '@angular/core';
import { GeoService } from './services/geo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription, filter } from 'rxjs';
import { AppService } from './services/app.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rotaAtual: string = ""

  constructor(private router: Router,   private location: Location){
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.rotaAtual = event.urlAfterRedirects;
    });
    
  }

  public goToHome(){
    this.router.navigate(["home"]);
  }

  public exibirNavbar(): boolean { 
    return this.rotaAtual.includes("/home");
  }

  public voltar(){
    if(this.rotaAtual.includes("/resultado")) {
      this.router.navigateByUrl("/home");
    } else {
      this.router.navigateByUrl("/resultado");
    }
  }
}