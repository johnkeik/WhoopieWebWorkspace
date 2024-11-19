import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-hint-animation',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './hint-animation.component.html',
  styleUrl: './hint-animation.component.scss'
})
export class HintAnimationComponent {
  options: AnimationOptions = {
    path: '/assets/images/hint-animation.json',
    loop: true,
    autoplay: true
  };
}
