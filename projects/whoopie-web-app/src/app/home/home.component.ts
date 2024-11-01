import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  inject,
} from '@angular/core';
import { BuildingBlocksComponent } from '../shared/building-blocks/building-blocks.component';
import { MovingBannerComponent } from '../shared/moving-banner/moving-banner.component';
import { ActiveSectionHandlerService } from '../core/services/active-section-handler.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovingBannerComponent, BuildingBlocksComponent],
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
        threshold: 0,
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
