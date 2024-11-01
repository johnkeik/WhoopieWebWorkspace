import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovingBannerComponent } from '../shared/moving-banner/moving-banner.component';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MovingBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{

  ngOnInit(): void {
      gsap.registerPlugin(ScrollTrigger);


      gsap.from('.about-text', {
        x:-1000,
        scrollTrigger: {
          trigger: ".about-text",
        start: "top 100%",
        end: "top: 70%",
        scrub: 2,
        toggleActions: "restart none none none"

        }
      })

      gsap.from('.avatar-img', {
        x:1000,
        scrollTrigger: {
          trigger: ".avatar-img",
        start: "top 100%",
        end: "top: 70%",
        scrub: 2,
        toggleActions: "restart none none none"

        }
      })
  } 
}
