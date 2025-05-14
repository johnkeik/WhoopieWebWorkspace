import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getAuth, provideAuth } from '@angular/fire/auth'; // Add this import
import environment from './environments/environment';



const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideFirestore(() => getFirestore()),
  provideDatabase(() => getDatabase()),
  provideAuth(() => getAuth()), // Add Auth provider
  { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig} // For compatibility with AngularFire compat
];

export const appConfig: ApplicationConfig = {
  providers: [
    ...firebaseProviders,
    provideRouter(routes),
    provideLottieOptions({
      player: () => player,
    }),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'gr'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
