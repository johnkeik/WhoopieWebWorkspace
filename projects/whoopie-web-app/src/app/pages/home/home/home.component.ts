import {
  AfterViewInit,
  Component,
  inject,
} from '@angular/core';
import { ActiveSectionHandlerService } from '../../../core/services/active-section-handler.service';
import { gsap } from 'gsap';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  activeSectionHandler = inject(ActiveSectionHandlerService);
  observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSectionHandler.setShowLightColor(true);
          } else {
            this.activeSectionHandler.setShowLightColor(false);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    setTimeout(() => {
      const element = document.getElementById('home-dark-container');
      if (element) {
        this.observer?.observe(element);
      }
    });
  }
}
