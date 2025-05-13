import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-discord',
  standalone: true,
  imports: [],
  templateUrl: './discord.component.html',
  styleUrl: './discord.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class DiscordComponent {
  discordLink = 'https://discord.gg/v3KN2Zf5';
}
