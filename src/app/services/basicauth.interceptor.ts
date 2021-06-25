import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASIC_AUTH } from '../constants/app-constants';
import { AuthService } from './auth.service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authorizationData = 'Basic ' + window.btoa(BASIC_AUTH.username + ':' + BASIC_AUTH.password);
    
    request = request.clone({
      setHeaders: {
        Authorization: authorizationData,
        'Content-Type': 'application/json'
      },
    });

    return next.handle(request);
  }
}
