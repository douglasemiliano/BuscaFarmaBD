import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GeoService } from './services/geo.service';
import { AppService } from './services/app.service';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { TesteComponent } from './components/teste/teste.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-rounting.module';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FarmaciaService } from './services/farmacia.service';
import { MapaComponent } from './components/mapa/mapa.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MapaDetalheComponent } from './components/mapa-detalhe/mapa-detalhe.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { StarRatingModule } from 'angular-star-rating';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpConfigInterceptorService } from './services/http-config-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    TesteComponent,
    HomeComponent,
    ResultadoComponent,
    MapaComponent,
    DetalhesComponent,
    MapaDetalheComponent,
    AvaliacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    SharedModule,
    StarRatingModule.forRoot(),
    NgSelectModule
   ],
  providers: [
    AppService,
    GeoService,
    FarmaciaService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
