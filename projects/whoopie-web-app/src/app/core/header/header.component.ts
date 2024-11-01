import { AfterContentInit, AfterViewInit, Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActiveSectionHandlerService } from '../services/active-section-handler.service';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap/gsap-core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterContentInit {
  activeSection = inject(ActiveSectionHandlerService).activeSection;
  showLightColor = inject(ActiveSectionHandlerService).showLightColor;
  isNavbarVisible = true;
  private previousScrollPosition = window.scrollY;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > this.previousScrollPosition) {
      // Scrolling down
      this.isNavbarVisible = false;
    } else {
      // Scrolling up
      this.isNavbarVisible = true;
    }
    this.previousScrollPosition = currentScrollPosition;
  }

  ngAfterContentInit(): void {
    let links = document.querySelectorAll(".nav-links");
    links.forEach((link, index) => {
      link.addEventListener("mouseover", () => {
        gsap.to('.cursor-outline', {
          width: 24,
          height: 24,
          backgroundColor: '#EE5A22',
          opacity: 0.5
        })
        link.classList.add("hovered-link");
      });
      link.addEventListener("mouseleave", () => {
        gsap.to('.cursor-outline', {
          width: 48,
          height: 48,
          backgroundColor: 'transparent',
          opacity: 1
  
        })
        link.classList.remove("hovered-link");
      });
    });
  }
}
