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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( private notifierService: NotifierService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';



          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            if (error.error.error === 'invalid_grant') {
              errorMessage = 'Username or password is incorrect'
            }
          }

          this.notifierService.notify('default', errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}
