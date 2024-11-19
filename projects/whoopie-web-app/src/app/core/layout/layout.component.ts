import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { ContactComponent } from '../../pages/contact/contact.component';
import { HomeComponent } from '../../pages/home/home.component';
import { ServicesComponent } from '../../pages/services/services.component';
import { ValuesComponent } from '../../values/values.component';
import { HeaderComponent } from '../header/header.component';
import { ActiveSectionHandlerService } from '../services/active-section-handler.service';
import { LayoutGsapAnimationsService } from './animations/layout-gsap-animations-service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HomeComponent,
    HeaderComponent,
    ServicesComponent,
    ContactComponent,
    ValuesComponent
  
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterViewInit {
  private observer: IntersectionObserver | null = null;
  activeSectionHandler = inject(ActiveSectionHandlerService);
  gsapAnimationsService = inject(LayoutGsapAnimationsService)
  maskSize = 40;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.initCursorListeners();
  }



  ngAfterViewInit(): void {
    this.setupIntersectionObserver();

    this.gsapAnimationsService.initGsapAnimations();

    

    
  }



  initCursorListeners() {
    // Track the mouse position and update cursor elements
    document.addEventListener('mousemove', (e: MouseEvent) => {
      gsap.to('.cursor-ball', {
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out', // Smooth easing for animation
      });
      gsap.to('.cursor-outline', {
        x: e.clientX,
        y: e.clientY,
      });
    });

    // Animate cursor outline on mousedown (left-click)
    document.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button === 0) {
        gsap.to('.cursor-outline', {
          width: 24,
          height: 24,
          backgroundColor: '#EE5A22',
        });
      }
    });

    // Reset cursor outline on mouseup
    document.addEventListener('mouseup', () => {
      gsap.to('.cursor-outline', {
        width: 48,
        height: 48,
        backgroundColor: 'transparent',
      });
    });
  }
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.activeSectionHandler.setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    setTimeout(() => {
      const sectionIDs = ['home', 'about', 'contact'];
      // Ensure elements are in the DOM before observing
      sectionIDs.forEach((el) => {
        const element = document.getElementById(el);
        console.log(element)
        if (element) {
          this.observer?.observe(element);
        }
      });
    }, 0);
  }
}
