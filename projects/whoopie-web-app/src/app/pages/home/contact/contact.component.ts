import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/input/input.component';
import { ComingSoonComponent } from '../../../shared/coming-soon/coming-soon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputComponent, ComingSoonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
