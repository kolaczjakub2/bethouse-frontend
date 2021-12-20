import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatchViewComponent } from './add-match-view.component';

describe('AddMatchViewComponent', () => {
  let component: AddMatchViewComponent;
  let fixture: ComponentFixture<AddMatchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatchViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
