import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
  OnDestroy,
  Input,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { CanvasRender } from './canvas-render';

/**
 * Wrapper around a canvas element.  Continuously redraws the input nbody outside the Angular event zone (preventing excessive messaging) using the requestAnimationFrame(..) callback.
 */
@Component({
  selector: 'app-nbody-canvas',
  styleUrls: ['nbody-canvas.component.css'],
  template: '<div class="nbodyCanvas"><canvas #nbodyCanvas width="800" height="800"></canvas></div>',
})
export class NBodyCanvasComponent implements OnDestroy, OnInit {
  @ViewChild('nbodyCanvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  nbody: CanvasRender;

  /**
   * Notifies a parent that the mouse was clicked withing the canvas.
   *
   * TODO: Fix for scaling issues and use service instead of output to manage selection.
   */
  @Output() selectEvent: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

  private context: CanvasRenderingContext2D;

  private intervalId: number;

  constructor(private ngZone: NgZone) {}

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    const rect: DOMRect = this.canvas.nativeElement.getBoundingClientRect();
    this.selectEvent.emit([event.clientX - rect.left, event.clientY - rect.top]);
  }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');

    // Run the render loop outside the Ng zone to avoid change detection overhead
    this.ngZone.runOutsideAngular(() => {
      this.render();
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.intervalId);
  }

  render(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    if (this.nbody) {
      this.nbody.render(this.context);
    }

    this.intervalId = requestAnimationFrame(this.render.bind(this));
  }
}
