import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp({"projectId":"tasks-4adbc","appId":"1:339975272269:web:f2851fd9bc19f31c7aa904","storageBucket":"tasks-4adbc.appspot.com","apiKey":"AIzaSyCtJbMPhWUMzwyTEcU_2qo5vGs-BESFqRI","authDomain":"tasks-4adbc.firebaseapp.com","messagingSenderId":"339975272269"})), 
    provideAuth(() => getAuth()), 
    provideFirebaseApp(() => initializeApp({"projectId":"tasks-4adbc","appId":"1:339975272269:web:f2851fd9bc19f31c7aa904","storageBucket":"tasks-4adbc.appspot.com","apiKey":"AIzaSyCtJbMPhWUMzwyTEcU_2qo5vGs-BESFqRI","authDomain":"tasks-4adbc.firebaseapp.com","messagingSenderId":"339975272269"})), 
    provideFirestore(() => getFirestore()),
    DatePipe
  ]
};
