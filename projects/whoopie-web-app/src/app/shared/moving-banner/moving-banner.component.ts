import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-moving-banner',
  standalone: true,
  imports: [],
  templateUrl: './moving-banner.component.html',
  styleUrl: './moving-banner.component.scss'
})
export class MovingBannerComponent implements AfterViewInit {
  items: string[] = [
    "Elegant UI/UX Designs",
    "iOS & Android Development",
    "Responsive Web Design",
    "Custom Website Design",
    "User-Centric Mobile Apps",
    "Scalable Servers",
    "Innovative Web Solutions",
    "Real-Time Applications"
];

ngAfterViewInit(): void {
  const firstEl = document.getElementById('fristScroll');
  const finalX = - (firstEl?.getBoundingClientRect()?.width ?? 0)

  // gsap.to(".item", {
  //   duration: 5,
  //   ease: 'none',
  //   x: "+=500",
  //   modifiers: {
  //     x: gsap.utils.unitize(x => parseFloat(x) % 500) //force x value to be between 0 and 500 using modulus
  //   },
  //   repeat: -1

  // })
  // gsap.to('.scroll-one', {
  //   x: finalX,
  //   duration: 5,
  //   ease: 'none',
  //   repeat: -1,
  // })
  // gsap.to('.scroll-two', {
  //   x: finalX / 2,
  //   duration: 5,
  //   ease: 'none',
  //   delay: 2.5,
  //   repeat: -1,
  // })
}
}
