import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( private notifierService: NotifierService,
               private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {

          if (error.error instanceof ErrorEvent) {
            this.notifierService.notify('default',  error.error.message);
          } else {
            if (error.status === 401) {
              this.router.navigateByUrl('/sign-in');
            }
            if (error.status === 403) {
              this.router.navigateByUrl('/forbidden');
            }

            if (error.status === 500) {
              this.notifierService.notify('default',  error.error.error_description);
            }

            if (error.error.error === 'invalid_grant') {
              this.notifierService.notify('default',  error.error.error_description);
            }

            if (error.error.error === 'unconfirmed_account') {
              this.notifierService.notify('default',  error.error.error_description);
            }
          }
          return throwError('');
        })
      )
  }
}
