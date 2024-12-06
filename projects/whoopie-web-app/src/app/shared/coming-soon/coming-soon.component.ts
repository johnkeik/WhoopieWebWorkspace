import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  options: AnimationOptions = {
    path: '/assets/animations/coming-soon.json',
    loop: true,
    autoplay: true,
    
  };

  private animationItem!: AnimationItem;

  onAnimationCreated(animation: AnimationItem): void {
    this.animationItem = animation;
    this.animationItem.setSpeed(3); // Adjust this value for faster/slower speed
  }
}
