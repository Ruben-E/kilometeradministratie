import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesOverviewComponent } from './rides-overview.component';

describe('RidesOverviewComponent', () => {
  let component: RidesOverviewComponent;
  let fixture: ComponentFixture<RidesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidesOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
