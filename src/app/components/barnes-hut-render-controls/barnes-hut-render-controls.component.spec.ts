import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarnesHutRenderControlsComponent } from './barnes-hut-render-controls.component';

describe('BarnesHutRenderControlsComponent', () => {
  let component: BarnesHutRenderControlsComponent;
  let fixture: ComponentFixture<BarnesHutRenderControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarnesHutRenderControlsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarnesHutRenderControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
