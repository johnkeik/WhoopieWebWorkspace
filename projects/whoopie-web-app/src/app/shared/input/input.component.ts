import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, input, OnInit, Output, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DigitOnlyDirective } from '../../directives/digit-only.directive';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, AfterViewInit {
  placeholder = input.required<string>();
  type = input.required<'text' | 'email' | 'textarea'>();
  required = input(false);
  invalidMessage = input<string | undefined>(undefined);
  disableInput = input(false);
  @Output() changeValue = new EventEmitter<string>();

  finalInputType?: 'text' | 'email' | 'textarea';
  value: string = '';
  focused = signal(false);
  inputId = 'custom-input-' + Math.random().toString(36).substring(2);

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

  onModelChange(val: any): void {
    if (!this.value) {
      this.value = '';
    }
    this.onChange(val);
    this.changeValue.emit(val);
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
