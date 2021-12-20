import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetslipListComponent } from './betslip-list.component';

describe('BetslipListComponent', () => {
  let component: BetslipListComponent;
  let fixture: ComponentFixture<BetslipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetslipListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetslipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
