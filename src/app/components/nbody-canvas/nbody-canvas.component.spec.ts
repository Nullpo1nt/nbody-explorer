import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NBodyCanvasComponent } from './nbody-canvas.component';

describe('NBodyCanvasComponent', () => {
  let component: NBodyCanvasComponent;
  let fixture: ComponentFixture<NBodyCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NBodyCanvasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NBodyCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
