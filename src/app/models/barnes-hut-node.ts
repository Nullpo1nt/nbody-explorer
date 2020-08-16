import { Body } from './body';
import { Boundary } from './boundary';

export class BarnesHutNode {
  readonly RENDER_MINIMUM_BOUND_LENGTH = 3;

  private nodes: BarnesHutNode[] = [];
  private body: Body;

  showBoundary = true;
  showTree = false;
  showCom = false;
  showBodies = true;

  constructor(private boundary: Boundary) {}

  reset(): void {
    this.nodes.length = 0;
    this.body = undefined;
  }

  public get internal(): boolean {
    return this.nodes.length !== 0;
  }

  public get external(): boolean {
    return this.nodes.length === 0;
  }

  private insertToChildNodes(body: Body): void {
    for (const node of this.nodes) {
      node.insert(body);
    }
  }

  public contains(body: Body): boolean {
    return this.boundary.contains(body.x, body.y);
  }

  public insert(body: Body): boolean {
    let inserted = false;

    if (this.boundary.contains(body.x, body.y)) {
      if (!this.body) {
        this.body = body;
      } else if (this.internal) {
        this.insertToChildNodes(body);

        // update CoM
        this.body = this.body.combineWith(body);
      } else {
        // Convert to internal node
        this.nodes = [
          new BarnesHutNode(this.boundary.quadrant(0)),
          new BarnesHutNode(this.boundary.quadrant(1)),
          new BarnesHutNode(this.boundary.quadrant(2)),
          new BarnesHutNode(this.boundary.quadrant(3)),
        ];

        this.insertToChildNodes(body);
        this.insertToChildNodes(this.body);

        // Create a new CoM
        this.body = new Body(this.body.x, this.body.y, this.body.mass, 0, 0).combineWith(body);
      }

      inserted = true;
    }

    return inserted;
  }

  public updateForce(target: Body, theta: number): void {
    if (this.body) {
      if (this.external && this.body !== target) {
        target.addForce(this.body);
      } else {
        const sdRatio: number = this.calculateSizeDistanceRation(target);

        if (sdRatio < theta) {
          target.addForce(this.body);
        } else {
          for (const node of this.nodes) {
            node.updateForce(target, theta);
          }
        }
      }
    }
  }

  public calculateSizeDistanceRation(p: Body): number {
    return this.boundary.length / Math.abs(this.body.distanceTo(p));
  }

  public renderBoundary(context: CanvasRenderingContext2D): void {
    // Prevent rendering too small bounds
    if (this.boundary.length > this.RENDER_MINIMUM_BOUND_LENGTH) {
      if (!this.body) {
        context.strokeStyle = '#000000';
        context.fillStyle = '#000000';
        this.boundary.render(context);
      }

      for (const node of this.nodes) {
        node.renderBoundary(context);
      }

      if (this.body && this.external) {
        context.strokeStyle = 'gray';
        context.fillStyle = '#111111';
        this.boundary.render(context);
      }
    }
  }

  public renderTree(context: CanvasRenderingContext2D): void {
    for (const node of this.nodes) {
      if (node.body) {
        context.beginPath();
        context.strokeStyle = '#880000';
        context.moveTo(node.body.x, node.body.y);
        context.lineTo(this.body.x, this.body.y);
        context.stroke();

        node.renderTree(context);
      }
    }
  }

  renderCoM(context: CanvasRenderingContext2D): void {
    if (this.body) {
      if (this.internal) {
        this.body.renderCoM(context);
      }

      for (const node of this.nodes) {
        node.showCom = this.showCom;
        node.renderCoM(context);
      }
    }
  }

  renderBody(context: CanvasRenderingContext2D): void {
    if (this.body) {
      if (this.external) {
        this.body.renderBody(context);
      }

      for (const node of this.nodes) {
        node.renderBody(context);
      }
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    // render boundaries
    if (this.showBoundary) {
      this.renderBoundary(context);
    }

    if (this.showTree) {
      this.renderTree(context);
    }

    if (this.showCom) {
      this.renderCoM(context);
    }

    if (this.showBodies) {
      this.renderBody(context);
    }
  }
}
