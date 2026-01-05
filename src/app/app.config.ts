import { ApplicationConfig, effect, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { effects, reducers } from './store'; // Import the reducers
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // HttpClient provider
    provideStore(reducers), // Register the reducers with the store
    provideEffects(effects), // NgRx Effects provider
    provideStoreDevtools({
      maxAge: 25, // Retiene los últimos 25 estados
      logOnly: !isDevMode(), // Restringe a solo lectura si no estás en desarrollo
      autoPause: true, // Pausa la grabación cuando la pestaña no está activa
      trace: false, // Si quieres ver el stack trace de cada acción (útil pero pesado)
      traceLimit: 75,
    }), // Optional: Redux DevTools integration
    provideRouter(routes), 
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()), // NgRx Store provider
  ]
};
