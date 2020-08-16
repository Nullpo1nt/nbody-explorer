import { Injectable } from '@angular/core';
import { Body } from '../models/body';

/**
 * Service for the management of bodies provided to the simulation.  A list of original body states is maintained and as needed duplicates of this state are provided to the public list of bodies.
 */
@Injectable({
  providedIn: 'root',
})
export class BodyProviderService {
  /**
   * List of bodies in their original state.
   */
  private originalBodies: Body[] = [
    new Body(450, 450, 100000000000, -0.15, 0.15),
    new Body(350, 350, 100000000000, 0.15, -0.15),
    new Body(450, 350, 100000000000, 0.15, 0.15),
    new Body(350, 450, 100000000000, -0.15, -0.15),
  ];

  /**
   * List of bodies provided to the simulation.
   */
  private bodyList: Body[] = [];

  constructor() {}

  /**
   * Generates random bodies for the original list.
   *
   * @param value Total number of bodies which should be available.
   */
  private generateRandomBodies(value: number): void {
    for (let i = this.originalBodies.length; i < value; i++) {
      this.originalBodies.push(
        new Body(
          100 + Math.random() * 600,
          100 + Math.random() * 600,
          100000000000,
          Math.random() - 0.25,
          Math.random() - 0.25
        )
      );
    }
  }

  /**
   * Resets the public list of bodies to an empty state.
   */
  resetBodies(): void {
    this.bodyList = [];
  }

  /**
   * Returns the current list of bodies.
   *
   * @param count Number of bodies to return or all currently provided bodies if undefined.
   */
  getBodies(count?: number): Body[] {
    if (count !== undefined) {
      if (this.bodyList.length < count) {
        // Ensure we have enough bodies generated
        this.generateRandomBodies(count);

        // Populate the public list as needed from the original list.
        for (let i = this.bodyList.length; i < count; i++) {
          const body = this.originalBodies[i];
          this.bodyList.push(new Body(body.x, body.y, body.mass, body.vX, body.vY));
        }
      } else if (this.bodyList.length > count) {
        this.bodyList.length = count;
      }
    }

    return this.bodyList;
  }
}
