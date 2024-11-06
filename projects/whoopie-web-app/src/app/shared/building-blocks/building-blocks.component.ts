import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-building-blocks',
  standalone: true,
  imports: [],
  templateUrl: './building-blocks.component.html',
  styleUrl: './building-blocks.component.scss',
})
export class BuildingBlocksComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Target the element
    // const rotateElement = document.querySelector('.block5');

    // rotateElement?.addEventListener('mousemove', function (e: any) {
    //   const event = e;
    //   const rect = rotateElement.getBoundingClientRect();

    //   const midPoint = rect.left + rect.width / 2;
    //   if (event.clientX < midPoint) {
    //     gsap.to(rotateElement, { duration: 0.5, rotation: -35 * ((midPoint - event.clientX )/ rect.width) });
    //   } else {
    //     gsap.to(rotateElement, { duration: 0.5, rotation: 35 * ((event.clientX - midPoint) / rect.width) });
    //   }
    // });

    // // Reset rotation on mouseout
    // rotateElement?.addEventListener('mouseout', function () {
    //   gsap.to(rotateElement, { duration: 0.5, rotation: 0 });
    // });

    const timeline = gsap.timeline({});
    const bouncingTextTimeline = gsap.timeline({delay: 2, repeat: -1});
    bouncingTextTimeline.to('.get-started', {
      y: -15,
      ease: 'power.out',
      delay: 1,
      duration: 0.15,
    })
    .to('.get-started', {
      y: 0,
      ease: 'bounce.out',
      duration: 0.6,
      delay: 0.15
    })
    ;

    timeline
      .from('.block1', {
        scale: 0,
        duration: 1,
        rotate: -360,
        xPercent: -250,
        yPercent: -1250,
        ease: 'bounce.out',
      })
      .from('.get-started', {
        scale: 0,
        duration: 1,
        rotate: -360,
        xPercent: -30,
        yPercent: -1250,
        ease: 'bounce.out',
      })
      
      .from(
        '.block2',
        {
          duration: 1,
          scale: 0,
          rotate: -360,
          yPercent: -1250,
          xPercent: 100,
          ease: 'bounce.out',
        },
        '>'
      )
      .from(
        '.block3',
        {
          scale: 0,
          duration: 1,
          rotate: -360,
          yPercent: -1250,
          xPercent: 100,
          ease: 'bounce.out',
        },
        '>'
      )
      .from(
        '.block4',
        {
          duration: 1,
          scale: 0,
          rotate: -360,
          yPercent: -1250,
          xPercent: -250,
          ease: 'bounce.out',
        },
        '>'
      )
      .from(
        '.block5',
        {
          scale: 0,
          duration: 1,
          rotate: -360,
          yPercent: -1250,
          ease: 'bounce.out',
        },
        '>'
      );
  }
}
