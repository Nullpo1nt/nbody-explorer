import { Component, Input } from '@angular/core';
import { BarnesHutNode } from '../../models/barnes-hut-node';

/**
 * Component providing basic controls for how the N-Body simulation is rendered.
 */
@Component({
  selector: 'app-barnes-hut-render-controls',
  templateUrl: './barnes-hut-render-controls.component.html',
  styleUrls: ['./barnes-hut-render-controls.component.css'],
})
export class BarnesHutRenderControlsComponent {
  @Input() root: BarnesHutNode;

  constructor() {}

  onShowBodiesChange(): void {
    this.root.showBodies = !this.root.showBodies;
  }
  onShowTreeChange(): void {
    this.root.showTree = !this.root.showTree;
  }

  onShowCoMChange(): void {
    this.root.showCom = !this.root.showCom;
  }

  onShowBoundsChange(): void {
    this.root.showBoundary = !this.root.showBoundary;
  }
}
