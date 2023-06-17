import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPurpleComponent } from './btn-purple.component';

describe('BtnPurpleComponent', () => {
  let component: BtnPurpleComponent;
  let fixture: ComponentFixture<BtnPurpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnPurpleComponent]
    });
    fixture = TestBed.createComponent(BtnPurpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
