import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarnesHutControlsComponent } from './barnes-hut-controls.component';

describe('BarnesHutControlsComponent', () => {
  let component: BarnesHutControlsComponent;
  let fixture: ComponentFixture<BarnesHutControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarnesHutControlsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarnesHutControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
