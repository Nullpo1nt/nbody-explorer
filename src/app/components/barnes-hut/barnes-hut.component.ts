import { Component, ViewChild, OnInit } from '@angular/core';
import { BodyProviderService } from '../../services/body-provider-service.service';
import { SimulationService } from '../../services/simulation.service';
import { BarnesHutControlsComponent } from '../barnes-hut-controls/barnes-hut-controls.component';
import { Body } from '../../models/body';
import { BarnesHutNode } from '../../models/barnes-hut-node';

/**
 * Provides view for Barnes-Hut N-Body simulation.
 */
@Component({
  selector: 'app-barnes-hut',
  templateUrl: './barnes-hut.component.html',
  styleUrls: ['./barnes-hut.component.css'],
})
export class BarnesHutComponent implements OnInit {
  /**
   * Maximum rendered size of a body.
   */
  readonly BODY_MAX_SIZE = 5;

  /**
   * Maximum body count
   */
  readonly BODY_MAX_COUNT = 5000;

  /**
   * Radius of click area for body selection.
   */
  readonly BODY_CLICK_LENGTH = 14;

  @ViewChild(BarnesHutControlsComponent)
  controls: BarnesHutControlsComponent;

  private bodies: Body[] = [];

  selected: Body[] = [];

  showWelcome = true;

  root: BarnesHutNode;

  get showSelected(): boolean {
    return this.selected.length !== 0;
  }

  constructor(private bodyProvider: BodyProviderService, private simulator: SimulationService) {}

  ngOnInit(): void {
    // Safe for now, simulator.root doesn't change
    this.root = this.simulator.root;

    // Force this to occur on the next VM cycle to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.controls.bodies.reset(4);
      this.controls.theta.reset(0);
      this.selected = [...this.bodies];
      for (const body of this.selected) {
        body.selected = true;
      }
      this.selected[0].showTail = true;
      this.selected[1].showTail = true;
      this.controls.onStartClick();
    });
  }

  onCloseWelcome(): void {
    this.showWelcome = false;
  }

  onAddBodies(): void {
    this.controls.onResetClick();
    this.controls.bodies.setValue(2500);
    this.controls.theta.setValue(1);
  }

  onClickPlay(): void {
    this.controls.onStartClick();
  }

  onClickReset(): void {
    this.controls.onResetClick();
  }

  onClickSetThetaZero(): void {
    this.controls.theta.setValue(0);
  }

  onSelectBody(event: [number, number]): void {
    for (const body of this.bodies) {
      const deltaX = Math.abs(event[0] - body.x);
      const deltaY = Math.abs(event[1] - body.y);

      if (deltaX < this.BODY_CLICK_LENGTH && deltaY < this.BODY_CLICK_LENGTH) {
        body.selected = !body.selected;
      }
    }

    this.updateSelected();
  }

  onSelectedCloseEvent(body: Body): void {
    body.selected = false;
    this.selected.splice(this.selected.indexOf(body), 1);
  }

  onResetEvent(): void {
    this.bodyProvider.resetBodies();
    this.selected = [];
    this.onBodiesEvent(this.bodies.length);
  }

  onBodiesEvent(value: number): void {
    this.bodies = this.bodyProvider.getBodies(value);

    // Scale bodies smaller as more are added to view
    for (const body of this.bodies) {
      body.size = Math.max(
        1,
        this.BODY_MAX_SIZE - Math.ceil((this.BODY_MAX_SIZE * this.bodies.length) / this.BODY_MAX_COUNT)
      );
    }

    this.updateSelected();
    this.simulator.generateNodes();
  }

  private updateSelected(): void {
    this.selected.length = 0;
    for (const body of this.bodies) {
      if (body.selected) {
        this.selected.push(body);
      }
    }
  }
}
