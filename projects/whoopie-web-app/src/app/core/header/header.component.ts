import { AfterContentInit, Component, HostListener, inject } from '@angular/core';
import { ActiveSectionHandlerService } from '../services/active-section-handler.service';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterContentInit {
  activeSection = inject(ActiveSectionHandlerService).activeSection;
  showLightColor = inject(ActiveSectionHandlerService).showLightColor;
  activeSerctionHandlerService = inject(ActiveSectionHandlerService);
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

  setActive(page: string){
    if(page === 'services') this.activeSerctionHandlerService.setActiveSection(page);
    const el = document.getElementById(page);
        if (el) {
          // Get the element's position relative to the document (page)
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    
          // If the element is pinned, adjust the scroll position manually
          // Use ScrollTrigger's pin state to determine how much to scroll
          const pinOffset = this.getPinOffset(el);
          const scrollPosition = elementPosition - pinOffset;
    
          // Scroll to the adjusted position, considering the pinning effect
          gsap.to(window, {
            scrollTo: { y: scrollPosition, autoKill: false },
            duration: 0
          });
        }
  }

  // Function to get the pin offset (if the element is pinned)
 getPinOffset(el: HTMLElement): number {
  const pin = ScrollTrigger.getById(el.id);
  return pin && pin.isActive ? el.offsetHeight : 0; // Adjust based on pinning state
}

}
