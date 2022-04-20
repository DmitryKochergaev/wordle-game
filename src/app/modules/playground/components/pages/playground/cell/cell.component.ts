import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ICell } from "../../../../models/playground.model";

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CellComponent),
    multi: true
  }]
})
export class CellComponent implements ControlValueAccessor {

  public value: ICell = {
    key: '',
    state: 'neutral',
  };

  constructor() {
  }

  public registerOnChange(fn: any): void {
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(obj: ICell): void {
    this.value = obj;
  }


}
