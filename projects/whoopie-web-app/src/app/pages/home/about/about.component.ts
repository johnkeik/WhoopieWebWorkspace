import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {

}
