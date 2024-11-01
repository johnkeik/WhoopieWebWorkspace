import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DigitOnlyDirective } from '../../directives/digit-only.directive';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule,FormsModule,DigitOnlyDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  placeholder = input.required<string>();
  type = input.required<'text' | 'number' | 'password' | 'email'>();
  required = input(false);
  password = input(false);
  invalid = input<boolean | undefined>(false);
  maxLength = input<number | null>(null);
  maxDigits = input<number | undefined>(undefined);
  disableInput = input(false);
  @Output() changeValue = new EventEmitter<string>();

  finalInputType?: 'text' | 'number' | 'password' | 'email';
  value: string = '';
  focused = signal(false);
  inputId = 'custom-input-' + Math.random().toString(36).substring(2);
  // iconNameType = IconNameType;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.finalInputType = this.type();
  }

  ngAfterViewInit(): void {
    const inputElement = this.el.nativeElement.querySelector('input');
    // Add a slight delay to let the browser autofill happen
    setTimeout(() => {
      if (inputElement && inputElement.matches(':-webkit-autofill')) {
        this.focused.set(true);
      }
    }, 100);
  }

  revealPassword() {
    this.finalInputType =
      this.finalInputType === 'password' ? 'text' : 'password';
  }

  onModelChange(val: any): void {
    if (!this.value) {
      this.value = '';
    }
    this.onChange(val);
    this.changeValue.emit(val);
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.type() === 'number') {
      const charCode = event.charCode;
      if (charCode !== 0) {
        const charStr = String.fromCharCode(charCode);
        if (!charStr.match(/[0-9]/)) {
          event.preventDefault();
        }
      }
    }
  }

  onChange = (val: any) => {
    return val;
  };

  onTouch = () => {
    return undefined;
  };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
