export class Boundary {
  constructor(private xA: number, private xB: number, private yA: number, private yB: number) {}

  public contains(x: number, y: number): boolean {
    return x >= this.xA && x <= this.xB && y >= this.yA && y <= this.yB;
  }

  public get length(): number {
    return this.xB - this.xA;
  }

  public quadrant(position: number): Boundary {
    const aX: number = this.length / 2;
    const aY: number = this.length / 2;

    switch (position) {
      case 0: // bottom right
        return new Boundary(this.xA + aX, this.xB, this.yA + aY, this.yB);
      case 1: // top right
        return new Boundary(this.xA + aX, this.xB, this.yA, this.yB - aY);
      case 2: // top left
        return new Boundary(this.xA, this.xB - aX, this.yA, this.yB - aY);
      case 3: // bottom left
        return new Boundary(this.xA, this.xB - aX, this.yA + aY, this.yB);
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    context.fillRect(this.xA, this.yA, this.length, this.length);
    context.strokeRect(this.xA, this.yA, this.length, this.length);
  }
}
