/**
 * Class representing a point body with mass, position and velocity.
 */
export class Body {
  readonly G: number = 6.674 * 10 ** -11;

  // Minimum distance allowed between bodies when calculating forces
  readonly SLINGSHOT_PREVENTION_FACTOR = 5;

  readonly COM_RENDER_MASS_FRACTION_DIVISOR = 100000000000;
  readonly COM_RENDER_MIN_RADIUS = 1;
  readonly COM_RENDER_MAX_RADIUS = 10;

  readonly BODY_RENDER_VELOCITY_SCALE = 100;
  readonly BODY_RENDER_FORCE_SCALE = 0.0000001;

  readonly TAIL_MAX_LENGTH = 50; // Must be even number
  readonly TAIL_SEGMENT_DELTA_T = 10; // This much deltaT must past

  // Used for tracking when to create a new tail segment
  private deltaTSum = 0;

  private tailsHead = 0;
  private tails: number[] = [];

  public fX = 0;
  public fY = 0;

  public selected = false;
  public showVelocity = false;
  public showForce = false;
  public showTail = false;

  constructor(
    public x: number,
    public y: number,
    public mass: number,
    public vX: number = 0,
    public vY: number = 0,
    public size: number = 1
  ) {}

  combineWith(body: Body): Body {
    const massTotal: number = this.mass + body.mass;

    const newX: number = (this.mass * this.x + body.mass * body.x) / massTotal;
    const newY: number = (this.mass * this.y + body.mass * body.y) / massTotal;

    this.mass = massTotal;
    this.x = newX;
    this.y = newY;

    return this;
  }

  distanceTo(body: Body): number {
    const dx = this.x - body.x;
    const dy = this.y - body.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  reset(): void {
    this.fX = 0.0;
    this.fY = 0.0;
  }

  update(deltaT: number): void {
    this.vX += (deltaT * this.fX) / this.mass;
    this.vY += (deltaT * this.fY) / this.mass;
    this.x += this.vX * deltaT;
    this.y += this.vY * deltaT;

    if (this.showTail) {
      if (this.deltaTSum === 0) {
        if (this.tails.length < this.TAIL_MAX_LENGTH) {
          this.tails = [this.x, this.y].concat(this.tails);
        } else {
          if (this.tailsHead <= 0) {
            this.tailsHead = this.tails.length - 2;
          } else {
            this.tailsHead -= 2;
          }

          this.tails[this.tailsHead] = this.x;
          this.tails[this.tailsHead + 1] = this.y;
        }
      }

      this.deltaTSum += deltaT;

      if (this.deltaTSum > this.TAIL_SEGMENT_DELTA_T) {
        this.deltaTSum = 0;
      }
    }
  }

  addForce(p: Body): void {
    const dx = p.x - this.x;
    const dy = p.y - this.y;

    // Never allow bodys closer than 5, i.e. simulate object of radius 5,
    // but not collisions.  This is to reduce "sling shotting" of objects
    const dist = Math.max(this.SLINGSHOT_PREVENTION_FACTOR, Math.sqrt(dx ** 2 + dy ** 2));
    const force: number = this.G * ((this.mass * p.mass) / dist ** 2);

    this.fX += force * (dx / dist);
    this.fY += force * (dy / dist);
  }

  renderBody(context: CanvasRenderingContext2D): void {
    if (this.showTail) {
      context.beginPath();
      context.moveTo(this.x, this.y);
      for (let i = 0, p = this.tailsHead; i < this.tails.length; i += 2, p = (p + 2) % this.TAIL_MAX_LENGTH) {
        context.lineTo(this.tails[p], this.tails[p + 1]);
      }
      context.strokeStyle = '#888888';
      context.stroke();
    }

    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();

    if (this.showVelocity) {
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(
        this.x + this.vX * this.BODY_RENDER_VELOCITY_SCALE,
        this.y + this.vY * this.BODY_RENDER_VELOCITY_SCALE
      );
      context.strokeStyle = 'green';
      context.stroke();
    }

    if (this.showForce) {
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + this.fX * this.BODY_RENDER_FORCE_SCALE, this.y + this.fY * this.BODY_RENDER_FORCE_SCALE);
      context.strokeStyle = 'pink';
      context.stroke();
    }

    if (this.selected) {
      context.beginPath();
      context.arc(this.x, this.y, 7, 0, 2 * Math.PI);
      context.strokeStyle = 'yellow';
      context.stroke();
    }
  }

  public renderCoM(context: CanvasRenderingContext2D): void {
    const massFraction = this.mass / this.COM_RENDER_MASS_FRACTION_DIVISOR;

    context.beginPath();
    context.arc(
      this.x,
      this.y,
      Math.max(this.COM_RENDER_MIN_RADIUS, Math.min(this.COM_RENDER_MAX_RADIUS, massFraction)),
      0,
      2 * Math.PI
    );
    context.strokeStyle = 'orange';
    context.fillStyle = 'black';
    context.stroke();
    context.fill();
  }
}
