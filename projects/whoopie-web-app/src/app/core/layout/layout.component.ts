import {
  AfterViewInit,
  Component,
  inject
} from '@angular/core';
import { ContactComponent } from '../../pages/home/contact/contact.component';
import { HomeComponent } from '../../pages/home/home/home.component';
import { ValuesComponent } from '../../pages/home/values/values.component';
import { HeaderComponent } from '../header/header.component';
import { ActiveSectionHandlerService } from '../services/active-section-handler.service';
import { LayoutGsapAnimationsService } from './animations/layout-gsap-animations-service';
import { AboutComponent } from '../../pages/home/about/about.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    ValuesComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterViewInit {
  private observer: IntersectionObserver | null = null;
  activeSectionHandler = inject(ActiveSectionHandlerService);
  gsapAnimationsService = inject(LayoutGsapAnimationsService)
  maskSize = 40;

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
    setTimeout(() => {
      this.gsapAnimationsService.initGsapAnimations();

    },0)
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
      sectionIDs.forEach((el) => {
        const element = document.getElementById(el);
        if (element) {
          this.observer?.observe(element);
        }
      });
    }, 0);
  }
}
