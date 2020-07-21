import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MENU } from './configs';

@NgModule({
  imports: [HttpClientModule, BrowserAnimationsModule, MatSnackBarModule],
  exports: [BrowserAnimationsModule, MatSnackBarModule],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    { provide: 'MENU', useValue: MENU },
  ],
})
export class CoreModule {}
