import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AboutComponent } from '../../about/about.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesComponent } from '../../services/services.component';
import { Location } from '@angular/common';
import { ActiveSectionHandlerService } from '../services/active-section-handler.service';
import { BuildingBlocksComponent } from '../../shared/building-blocks/building-blocks.component';
import { ContactComponent } from '../../contact/contact.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    BuildingBlocksComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterViewInit {
  private observer: IntersectionObserver | null = null;
  activeSectionHandler = inject(ActiveSectionHandlerService);
  maskSize = 40;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    // document.addEventListener('mousemove', (e) => {
    //   gsap.to('.cursor-ball', {
    //     x: e.pageX,
    //     y: e.pageY,
    //     // z: 0,
    //     ease: 'power2.out', // Smooth easing for animation
    //   });
    //   gsap.to('.cursor-outline', {
    //     x: e.pageX,
    //     y: e.pageY,
    //     // z: 0,
    //   });
    // });

    // document.addEventListener('mousedown', (e) => {
    //   if (e.button === 0) {
    //     gsap.to('.cursor-outline', {
    //       width: 24,
    //       height: 24,
    //       backgroundColor: '#EE5A22',
    //     });
    //   }
    // });

    // document.addEventListener('mouseup', () => {
    //   gsap.to('.cursor-outline', {
    //     width: 48,
    //     height: 48,
    //     backgroundColor: 'transparent',
    //   });
    // });

  }

  ngAfterViewInit(): void {
    this.route.url.subscribe((url) => {
      if (url.length && url[0].path) {
        const el = document.getElementById(url[0].path);
        el?.scrollIntoView({ behavior: 'smooth' });
        this.activeSectionHandler.setActiveSection(url[0].path);
      }
    });
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.location.replaceState(`${sectionId}`);
            this.activeSectionHandler.setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    setTimeout(() => {
      const sectionIDs = ['home', 'about', 'services', 'contact'];
      // Ensure elements are in the DOM before observing
      sectionIDs.forEach((el) => {
        const element = document.getElementById(el);
        if (element) {
          this.observer?.observe(element);
        }
      });
    }, 0);
  }
}
