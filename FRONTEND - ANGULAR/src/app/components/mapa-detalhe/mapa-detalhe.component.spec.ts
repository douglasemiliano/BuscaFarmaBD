import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaDetalheComponent } from './mapa-detalhe.component';

describe('MapaDetalheComponent', () => {
  let component: MapaDetalheComponent;
  let fixture: ComponentFixture<MapaDetalheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapaDetalheComponent]
    });
    fixture = TestBed.createComponent(MapaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
