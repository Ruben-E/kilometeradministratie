import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetPickerComponent } from './preset-picker.component';

describe('PresetPickerComponent', () => {
  let component: PresetPickerComponent;
  let fixture: ComponentFixture<PresetPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
