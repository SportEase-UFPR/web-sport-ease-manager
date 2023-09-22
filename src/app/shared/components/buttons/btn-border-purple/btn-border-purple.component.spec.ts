import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBorderPurpleComponent } from './btn-border-purple.component';

describe('BtnBorderPurpleComponent', () => {
  let component: BtnBorderPurpleComponent;
  let fixture: ComponentFixture<BtnBorderPurpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnBorderPurpleComponent]
    });
    fixture = TestBed.createComponent(BtnBorderPurpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
