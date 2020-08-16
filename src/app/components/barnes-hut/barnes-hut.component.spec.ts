import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarnesHutComponent } from './barnes-hut.component';

describe('BarnesHutComponent', () => {
  let component: BarnesHutComponent;
  let fixture: ComponentFixture<BarnesHutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarnesHutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarnesHutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
