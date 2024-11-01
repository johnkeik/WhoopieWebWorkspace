import { Component } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
