import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpHeadersIntercpetor } from './shared/util-http-intercpetor/http-header.intercpetor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersIntercpetor, multi: true },
  importProvidersFrom([
    HttpClientModule
  ])
  ]
};
