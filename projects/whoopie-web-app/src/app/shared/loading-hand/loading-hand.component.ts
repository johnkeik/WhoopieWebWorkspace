import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-loading-hand',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './loading-hand.component.html',
  styleUrl: './loading-hand.component.scss'
})
export class LoadingHandComponent {
  options: AnimationOptions = {
    path: '/assets/animations/loading-hand.json',
    loop: true,
    autoplay: true
  };
}
