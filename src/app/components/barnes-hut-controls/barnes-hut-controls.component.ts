import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SimulationService } from '../../services/simulation.service';

/**
 * Controls for the N-Body simulation parameters.
 */
@Component({
  selector: 'app-barnes-hut-controls',
  templateUrl: './barnes-hut-controls.component.html',
  styleUrls: ['./barnes-hut-controls.component.css'],
})
export class BarnesHutControlsComponent implements OnInit {
  @Input() maxBodies = 1;

  @Input() maxTheta = 1;

  @Input() maxDeltaT = 1;

  @Input() isPlaying = false;

  @Output() resetEvent = new EventEmitter<any>();

  @Output() bodiesEvent = new EventEmitter<number>();

  theta = new FormControl(1);

  deltaT = new FormControl(1);

  bodies = new FormControl(4);

  bodiesDisabled = false;

  constructor(private simulator: SimulationService) {}

  ngOnInit(): void {
    this.bodies.registerOnChange(this.onBodiesChange.bind(this));
    this.deltaT.registerOnChange(this.onDeltaTChange.bind(this));
    this.theta.registerOnChange(this.onThetaChange.bind(this));

    this.simulator.theta = this.theta.value;
    this.simulator.deltaT = this.deltaT.value;
  }

  onStartClick(): void {
    this.bodies.disable();
    this.bodiesDisabled = true;
    this.isPlaying = true;
    this.simulator.start();
  }

  onStopClick(): void {
    this.simulator.stop();
    this.bodies.enable();
    this.bodiesDisabled = false;
    this.isPlaying = false;
  }

  onResetClick(): void {
    this.onStopClick();
    this.resetEvent.emit();
  }

  onAddBodiesClick(): void {
    this.bodies.setValue(this.bodies.value + 1);
  }

  onRemoveBodiesClick(): void {
    this.bodies.setValue(this.bodies.value - 1);
  }

  onBodiesChange(): void {
    this.bodiesEvent.emit(this.bodies.value);
  }

  onThetaChange(): void {
    this.simulator.theta = this.theta.value;
  }

  onDeltaTChange(): void {
    this.simulator.deltaT = this.deltaT.value;
  }
}
