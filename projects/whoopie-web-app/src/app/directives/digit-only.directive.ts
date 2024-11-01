import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cwoDigitOnly]',
  standalone: true
})
export class DigitOnlyDirective {
  @Input() maxDigits: number = 0;

  constructor(private ngControl: NgControl) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue: string = inputElement.value;
    const currentLength = currentValue.length;

    // Allow only digits
    if (event.key < '0' || event.key > '9') {
      event.preventDefault();
    }

    // Prevent input if max digits are reached
    if (currentLength >= this.maxDigits) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pastedInput = clipboardData.replace(/\D/g, ''); // Remove non-numeric characters

    if (pastedInput.length > this.maxDigits) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let currentValue: string = inputElement.value;

    // Trim value to max digits
    if (currentValue.length > this.maxDigits) {
      currentValue = currentValue.slice(0, this.maxDigits);
      this.ngControl.control?.setValue(currentValue);
    }
  }
}
