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

const firebaseConfig = {
  apiKey: "AIzaSyAIWE3BFITS-cuE0aB4t0hZaFHGthSSRlU",
  authDomain: "whoopiewebapp.firebaseapp.com",
  projectId: "whoopiewebapp",
  storageBucket: "whoopiewebapp.firebasestorage.app",
  messagingSenderId: "237439699594",
  appId: "1:237439699594:web:a7802e691bbb6cb7193b73",
  measurementId: "G-XM3ZEZ536Z",
};

const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirestore(() => getFirestore()),
  provideDatabase(() => getDatabase()),
  provideAuth(() => getAuth()), // Add Auth provider
  { provide: FIREBASE_OPTIONS, useValue: firebaseConfig } // For compatibility with AngularFire compat
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
