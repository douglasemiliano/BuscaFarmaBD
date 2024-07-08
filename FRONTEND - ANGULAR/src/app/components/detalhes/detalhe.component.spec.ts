import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheComponent } from './detalhes.component';

describe('DetalheComponent', () => {
  let component: DetalheComponent;
  let fixture: ComponentFixture<DetalheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalheComponent]
    });
    fixture = TestBed.createComponent(DetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
