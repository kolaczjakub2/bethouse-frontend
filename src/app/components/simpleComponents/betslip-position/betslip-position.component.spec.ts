import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetslipPositionComponent } from './betslip-position.component';

describe('BetslipPositionComponent', () => {
  let component: BetslipPositionComponent;
  let fixture: ComponentFixture<BetslipPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetslipPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetslipPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
