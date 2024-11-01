import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent, WhoopieWebLibComponent } from 'whoopie-web-lib';
import { CalendarComponent } from 'whoopie-web-lib';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WhoopieWebLibComponent, CalendarComponent, IconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'whoopie-web-app';
}
