import { NgModule } from '@angular/core';
import { PlaygroundComponent } from "./components/pages/playground/playground.component";
import { PlaygroundRoutingModule } from "./playground-routing.module";
import { CellComponent } from "./components/pages/playground/cell/cell.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    PlaygroundComponent,
    CellComponent,
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class PlaygroundModule { }
