import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { lettersArray, ROW_COUNT, ROW_LENGTH, wordsArray } from "../../../models/playground.model";

@Component({
  selector: 'playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    cells: new FormArray([])
  });

  public isGameFinished = false;

  public wordToGuess = wordsArray[Math.floor(Math.random()*wordsArray.length)];

  private currentIndex = 0;

  private currentRow = 1;

  get cells() {
    return this.form.get('cells') as FormArray;
  }

  constructor() {
  }

  public ngOnInit(): void {
    this.createFormArray();
  }

  private createFormArray(): void {
    for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < ROW_LENGTH; j++) {
        this.cells.push(new FormControl({
          key: '',
          state: 'neutral',
        }))
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  private onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        this.onEnterPressed();
        break;
      case 'Backspace':
        this.onBackspacePressed();
        break;
      default:
        this.onLetterPressed(event.key);
        break;
    }
  }

  private onEnterPressed(): void {
    if (this.currentIndex === this.currentRow * ROW_LENGTH) {
      for (let i = this.currentIndex - ROW_LENGTH; i < this.currentIndex; i++) {
        const cell = this.cells.at(i);
        const cellKey = cell.value.key.toLowerCase()
        let cellState = '';

        if (this.wordToGuess[i - (this.currentRow - 1) * ROW_LENGTH].toLowerCase() === cellKey) {
          cellState = 'correctLetterAndPlace';
        } else if (this.wordToGuess.toLowerCase().includes(cellKey)) {
          cellState = 'correctLetter';
        } else {
          cellState = 'wrongLetter';
        }

        cell.patchValue({
          key: cellKey,
          state: cellState,
        })
      }
      this.currentRow++;

      if (this.currentIndex === ROW_LENGTH * ROW_COUNT) {
        this.isGameFinished = true;
      }
    }
  }

  private onBackspacePressed(): void {
    if (this.currentIndex > 0 && this.currentIndex > (this.currentRow - 1) * ROW_LENGTH) {
      this.cells.at(--this.currentIndex)?.patchValue({ key: '' })
    }
  }

  private onLetterPressed(key: string): void {
    if (lettersArray.includes(key) && this.currentIndex < this.currentRow * ROW_LENGTH) {
      this.cells.at(this.currentIndex++)?.patchValue({ key });
    }
  }
}
