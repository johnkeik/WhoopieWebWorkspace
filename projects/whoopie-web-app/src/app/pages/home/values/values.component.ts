import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';


@Component({
  selector: 'app-values',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './values.component.html',
  styleUrl: './values.component.scss',
})
export class ValuesComponent  {
  
}
