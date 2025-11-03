import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input() label = "";
  @Input() type = "text";
  @Input() placeholder = "";
  @Output() textChange = new EventEmitter<string>();

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.textChange.emit(inputValue);
  }

}
