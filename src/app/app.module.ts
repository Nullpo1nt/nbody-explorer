import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NBodyCanvasComponent } from './components/nbody-canvas/nbody-canvas.component';
import { BarnesHutComponent } from './components/barnes-hut/barnes-hut.component';
import { BarnesHutControlsComponent } from './components/barnes-hut-controls/barnes-hut-controls.component';
import { BodyCardComponent } from './components/body-card/body-card.component';
import { BarnesHutRenderControlsComponent } from './components/barnes-hut-render-controls/barnes-hut-render-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    NBodyCanvasComponent,
    BarnesHutComponent,
    BarnesHutControlsComponent,
    BodyCardComponent,
    BarnesHutRenderControlsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
