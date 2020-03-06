import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { NotAuthenticatedErro } from '../core/error-handler.service';

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
      return from(this.auth.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.auth.isAccessTokenInvalido()) {
              throw new NotAuthenticatedErro();
            }
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            return next.handle(req);
          })
        );
    }

    return next.handle(req);
  }
}
