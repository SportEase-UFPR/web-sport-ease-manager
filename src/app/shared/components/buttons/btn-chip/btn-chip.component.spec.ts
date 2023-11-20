import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnChipComponent } from './btn-chip.component';

describe('BtnChipComponent', () => {
  let component: BtnChipComponent;
  let fixture: ComponentFixture<BtnChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnChipComponent]
    });
    fixture = TestBed.createComponent(BtnChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
