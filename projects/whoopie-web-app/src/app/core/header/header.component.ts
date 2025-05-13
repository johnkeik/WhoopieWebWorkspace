import {
  AfterContentInit,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { ActiveSectionHandlerService } from '../services/active-section-handler.service';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslocoService } from '@jsverse/transloco';
import { HamburgerComponent } from '../../shared/hamburger/hamburger.component';
import { CookieService } from '../services/cookie-service';
import { Router } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HamburgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterContentInit {
  activeSection = inject(ActiveSectionHandlerService).activeSection;
  showLightColor = inject(ActiveSectionHandlerService).showLightColor;
  activeSerctionHandlerService = inject(ActiveSectionHandlerService);
  translocoService = inject(TranslocoService);
  cookieService = inject(CookieService);
  router = inject(Router);

  isNavbarVisible = true;
  private previousScrollPosition = window.scrollY;
  visibleMenu = false;
  activeLang = 'en';

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
    let links = document.querySelectorAll('.nav-links');
    links.forEach((link, index) => {
      link.addEventListener('mouseover', () => {
        gsap.to('.cursor-outline', {
          width: 24,
          height: 24,
          backgroundColor: '#EE5A22',
          opacity: 0.5,
        });
        link.classList.add('hovered-link');
      });
      link.addEventListener('mouseleave', () => {
        gsap.to('.cursor-outline', {
          width: 48,
          height: 48,
          backgroundColor: 'transparent',
          opacity: 1,
        });
        link.classList.remove('hovered-link');
      });
    });
    this.setActiveLang();
  }

  setActive(page: string) {
    if(page === 'blog'){
      this.router.navigate(['blog']);
      window.scrollTo(0, 0);
      this.activeSerctionHandlerService.setActiveSection(page);
    } else {
      this.router.navigate(['']);
      this.visibleMenu = false;
      document.body.style.overflow = '';
      document.documentElement.style.overflow = ''; 
      if (page === 'services')
        this.activeSerctionHandlerService.setActiveSection(page);
      const el = document.getElementById(page);
      if (el) {
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const pinOffset = this.getPinOffset(el);
        const scrollPosition = elementPosition - pinOffset;
        gsap.to(window, {
          scrollTo: { y: scrollPosition, autoKill: false },
          duration: 0,
        });
      }
    }
    
  }

  getPinOffset(el: HTMLElement): number {
    const pin = ScrollTrigger.getById(el.id);
    return pin && pin.isActive ? el.offsetHeight : 0;
  }

  changeLanguage(lang: 'en' | 'gr') {
    this.translocoService.setActiveLang(lang);
    this.setActiveLang();
    if(this.visibleMenu) this.toggleMenu();
  }

  setActiveLang() {
    this.activeLang = this.translocoService.getActiveLang();
    this.cookieService.setCookie('lang', this.activeLang);
  }

  toggleMenu() {
    this.visibleMenu = !this.visibleMenu;
    if (this.visibleMenu) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = ''; 
    }
  }
}
