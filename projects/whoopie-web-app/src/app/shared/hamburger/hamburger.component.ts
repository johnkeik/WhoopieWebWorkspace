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

  private animationItem!: AnimationItem; // Store the animation instance

  // This gets called when the animation is created
  onAnimationCreated(animation: AnimationItem): void {
    this.animationItem = animation;
    this.animationItem.setSpeed(2)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.animationItem) {
      // Play animation based on the toggle value
      if (this.open()) {
        this.playToHalf();

      } else {
        this.playFromHalfToEnd();
      }
    }
  }

  // Play the animation up to the halfway point
  private playToHalf(): void {
    const halfFrame = this.animationItem.totalFrames / 2;
    // this.animationItem.goToAndPlay(halfFrame, true); 
    this.animationItem.playSegments([0, 70], true); // Play from start to halfway
  }

  // Play the animation from halfway to the end
  private playFromHalfToEnd(): void {
    const halfFrame = this.animationItem.totalFrames / 2;
    console.log(this.animationItem.totalFrames)
    // this.animationItem.goToAndStop(this.animationItem.totalFrames, true); 
    // this.animationItem.goToAndPlay(halfFrame, true); 

    this.animationItem.playSegments([70, 140], true); // Play from halfway to end/
  }
  
}
