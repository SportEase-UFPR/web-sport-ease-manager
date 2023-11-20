import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacaoClientesComponent } from './comunicacao-clientes.component';

describe('ComunicacaoClientesComponent', () => {
  let component: ComunicacaoClientesComponent;
  let fixture: ComponentFixture<ComunicacaoClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicacaoClientesComponent]
    });
    fixture = TestBed.createComponent(ComunicacaoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
