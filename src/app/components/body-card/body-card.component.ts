import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Body } from '../../models/body';

/**
 * Simple card providing details on a body object.
 */
@Component({
  selector: 'app-body-card',
  templateUrl: './body-card.component.html',
  styleUrls: ['./body-card.component.css'],
})
export class BodyCardComponent {
  /**
   * Body model object
   */
  @Input() body: Body;

  /**
   * Index number of the body.
   */
  @Input() index: number;

  /**
   * dispatched when the close button is clicked.
   */
  @Output() closeEvent: EventEmitter<Body> = new EventEmitter<Body>();

  constructor() {}

  onClose(body: Body): void {
    this.closeEvent.emit(body);
  }

  onShowVelocityChange(body: Body): void {
    body.showVelocity = !body.showVelocity;
  }

  onShowForceChange(body: Body): void {
    body.showForce = !body.showForce;
  }

  onShowTailChange(body: Body): void {
    body.showTail = !body.showTail;
  }
}
