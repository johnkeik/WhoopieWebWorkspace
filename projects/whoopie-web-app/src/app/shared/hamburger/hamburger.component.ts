import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss'
})
export class HamburgerComponent implements OnChanges {
  open = input.required<boolean>();

  options: AnimationOptions = {
    path: '/assets/animations/hamburger.json',
    autoplay: false,
    loop: false
  };

  private animationItem!: AnimationItem;

  onAnimationCreated(animation: AnimationItem): void {
    this.animationItem = animation;
    this.animationItem.setSpeed(2)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.animationItem) {
      if (this.open()) {
        this.playToHalf();

      } else {
        this.playFromHalfToEnd();
      }
    }
  }

  private playToHalf(): void {
    const halfFrame = this.animationItem.totalFrames / 2;
    this.animationItem.playSegments([0, 70], true);
  }

  private playFromHalfToEnd(): void {
    this.animationItem.playSegments([70, 140], true);
  }
  
}
