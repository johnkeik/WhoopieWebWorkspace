import { Component } from '@angular/core';
import { ValuesComponent } from './values/values.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DiscordComponent } from './discord/discord.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponent, ValuesComponent, AboutComponent, ContactComponent, DiscordComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
