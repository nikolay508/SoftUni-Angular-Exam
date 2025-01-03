import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorMsgService } from './core/error-msg/error-msg.service';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    });
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 && err.error?.message === 'Invalid token!') {
        router.navigate(['/home']);
      } else {
        errorMsgService.setError(err);
        router.navigate(['/error']);
      }

      throw err;
    })
  );
};
