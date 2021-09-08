//httpConfig.interceptor.ts
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private fireAuth: AngularFireAuth) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = (this.fireAuth.currentUser);
    console.log('tokennnnnnnnnnnn', token);

    //Authentication by setting header with token value
    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          'Authorization': `${localStorage.getItem('tokenId')}`,
          'Content-Type': 'application/json',
        })
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }));
  }


}