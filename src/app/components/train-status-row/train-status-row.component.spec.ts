import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainStatusRowComponent } from './train-status-row.component';

describe('TrainStatusRowComponent', () => {
  let component: TrainStatusRowComponent;
  let fixture: ComponentFixture<TrainStatusRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainStatusRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainStatusRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
