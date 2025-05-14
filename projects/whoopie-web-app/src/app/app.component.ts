import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { appInit } from './app-init';
import { LoadingHandComponent } from './shared/loading-hand/loading-hand.component';
import { gsap } from 'gsap';
import { TranslocoService } from '@jsverse/transloco';
import { CookieService } from './core/services/cookie-service';
import { FirebaseService } from './core/services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingHandComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  titsle = 'whoopie-web-app';
  appStatus = appInit();
  translocoService = inject(TranslocoService);
  cookieService = inject(CookieService)
  loadingTransloco = true;
  firebaseService = inject(FirebaseService);
  constructor() {
    this.initCursorListeners();
    const lang_cookie = this.cookieService.getCookie('lang')
    if(lang_cookie){
      this.translocoService.setActiveLang(lang_cookie);
    }
    this.translocoService.selectTranslateObject('home').subscribe(() => {
      this.loadingTransloco = false;
    });

    // this.firebaseService.getFirestoreData('blogPosts').subscribe((data) => {
    //   console.log('Firestore data:', data);
    // });



  }

  initCursorListeners() {
    // Track the mouse position and update cursor elements
    document.addEventListener('mousemove', (e: MouseEvent) => {
      gsap.to('.cursor-outline', {
        x: e.clientX + 4,
        y: e.clientY + 4,
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


  reload() {
    location.reload();
  }

}
