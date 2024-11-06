import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {


  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".article-text-1", {
      scale: 0,
      duration: 4,
      scrollTrigger: {
        trigger: ".article-text-1",
        start: "top 100%",
        end: "top: 80%",
        scrub: 4,
        toggleActions: "restart none none none",
      }
    })
    gsap.from(".article-text-2", {
      scale: 0,
      duration: 4,
      scrollTrigger: {
        trigger: ".article-text-2",
        start: "top 100%",
        end: "top: 80%",
        scrub: 4,
        toggleActions: "restart none none none",
      }
    })
    gsap.from(".article-text-3", {
      scale: 0,
      duration: 4,
      scrollTrigger: {
        trigger: ".article-text-3",
        start: "top 100%",
        end: "top: 80%",
        scrub: 4,
        toggleActions: "restart none none none",
      }
    })
    gsap.from(".circles", {
      x:-1000,
      duration: 2,
      scrollTrigger: {
        trigger: ".circles",
        start: "top 100%",
        end: "top: 70%",
        scrub: 4,
        toggleActions: "restart none none none",
      }
    })
    gsap.from(".vector-line-1", {
      x:1000,
      duration: 2,
      scrollTrigger: {
        trigger: ".vector-line-1",
        start: "top 100%",
        end: "top: 70%",
        scrub: 4,
        toggleActions: "restart none none none",
      }
    })
    gsap.from(".vector-line-2-wrapper", {
      y:300,
      duration: 2,
      scrollTrigger: {
        trigger: ".vector-line-2",
        start: "top 100%",
        end: "top: 70%",
        scrub: 4,
        toggleActions: "restart none none none",
      }
    })
    gsap.to(".grid-icon", {
      rotate: 500,
      scrollTrigger: {
        trigger: ".grid-icon",
        start: "top 100%",
        end: "top: 0%",
        scrub: true,
        toggleActions: "restart none none none",
      }
    })
  }

}
