import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipEsporteComponent } from './chip-esporte.component';

describe('ChipEsporteComponent', () => {
  let component: ChipEsporteComponent;
  let fixture: ComponentFixture<ChipEsporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipEsporteComponent]
    });
    fixture = TestBed.createComponent(ChipEsporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
