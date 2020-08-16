import { Injectable } from '@angular/core';
import { BodyProviderService } from './body-provider-service.service';
import { BarnesHutNode } from '../models/barnes-hut-node';
import { Boundary } from '../models/boundary';
import { Subscription, interval } from 'rxjs';

/**
 * Service for managing the simulation aspect of the application.  A timer callback provides execution of the simulation loop.
 */
@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  readonly BOUNDS: Boundary = new Boundary(0, 800, 0, 800);

  private timerSubscription: Subscription;

  /**
   * Root node of the Barnes-Hut tree.
   */
  root: BarnesHutNode = new BarnesHutNode(this.BOUNDS);

  /**
   * Barnes-Hut algorithm's theta value.
   */
  theta = 0;

  /**
   * Simulation time step.
   */
  deltaT = 0;

  /**
   *
   * @param bodyProvider Service which provides a list of bodies.
   */
  constructor(private bodyProvider: BodyProviderService) {}

  /**
   * Starts the execution of simulation.
   *
   * @param frequency Milliseconds between simulation step execution (note: not delta t).
   */
  start(frequency: number = 10): void {
    if (!this.timerSubscription) {
      this.timerSubscription = interval(frequency).subscribe(() => {
        this.step();
      });
    }
  }

  /**
   * Stops the execution of the simulation.
   */
  stop(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  /**
   * Steps the simulation one interval of deltaT.
   */
  step(): void {
    this.generateNodes();

    const bodies = this.bodyProvider.getBodies();

    // Update forces
    for (const body of bodies) {
      body.reset();
      if (this.root.contains(body)) {
        this.root.updateForce(body, this.theta);
      }
    }

    // Update positions
    for (const body of bodies) {
      if (this.root.contains(body)) {
        body.update(this.deltaT);
      }
    }
  }

  /**
   * Generates the tree for the current bodies.
   */
  generateNodes(): void {
    this.root.reset();

    // Construct Barnes Hut tree
    const bodies = this.bodyProvider.getBodies();
    for (const body of bodies) {
      this.root.insert(body);
    }
  }
}
