import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRideComponent } from './log-ride.component';

describe('LogRideComponent', () => {
  let component: LogRideComponent;
  let fixture: ComponentFixture<LogRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
