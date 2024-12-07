import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { inject, Injectable } from '@angular/core';
import { ActiveSectionHandlerService } from '../../services/active-section-handler.service';

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class LayoutGsapAnimationsService {
  private activeSectoinHandlerService = inject(ActiveSectionHandlerService);
  constructor() {}

  public initGsapAnimations() {
    const scrollAmount = this.getScrollAmount();

    const masterTimeline = gsap.timeline();
    
    masterTimeline.to('.values-container', {
      x: scrollAmount,
      duration: 3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.values-container-wrapper',
        start: 'top top',
        end: () => `+=${scrollAmount * -1}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        id: 'values-container-id',
        onEnter: () => {
          this.activeSectoinHandlerService.setActiveSection('services')
        },
        onEnterBack: () => {
          this.activeSectoinHandlerService.setActiveSection('services')
        },
      },
    });

    // Staggered animation for .value items
    masterTimeline.from(
      '.value',
      {
        y: 100,
        x: 300,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.values-container-wrapper',
          start: 'top 80%',
          end: () => `+=${scrollAmount * - 0.8}`,
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      },
      '+=0.5'
    ); // Slight delay after the previous animation

    // Animation for .choose-unique section, triggered by the end of the horizontal scroll
    masterTimeline.from(
      '.choose-unique',
      {
        x: -300,
        y: 100,
        opacity: 0,
        duration: 3,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.choose-unique',
          start: () => `top 90%`,
          end: 'top 80%',
          scrub: 2,
        },
      },
      '+=1'
    ); // Delay to control the sequence

    masterTimeline.from(
      '.avatar-img',
      {
        y: 400,
        opacity: 0,
        duration: 3,
        scrollTrigger: {
          trigger: '.choose-unique',
          start: () => `top 90%`,
          end: 'top 80%',
          scrub: 4,
        },
      },
      '+=1'
    );

    masterTimeline.from(
      '.my-story',
      {
        x: 300,
        y: 100,
        opacity: 0,
        duration: 3,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.my-story',
          start: () => `top 90%`,
          end: 'top 80%',
          scrub: 2,
        },
      },
      '+=2'
    );

    masterTimeline.from(
      '.partner-with-me',
      {
        x: 300,
        y: 100,
        opacity: 0,
        duration: 3,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.partner-with-me',
          start: () => `top 90%`,
          end: 'top 80%',
          scrub: 2,
        },
      },
      '+=2'
    );
  }

  getScrollAmount() {
    const valuesContainer = document.querySelector('.values-container');
    return valuesContainer
      ? -(valuesContainer.scrollWidth - window.innerWidth)
      : 0;
  }
}
