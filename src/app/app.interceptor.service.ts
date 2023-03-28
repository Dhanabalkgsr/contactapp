import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpHeaders } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class ContactInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    let status: string;

    const reqmsg = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
      .append('withCredentials', 'true')
    })

    return next.handle(reqmsg).pipe(
        tap(
          event => {
            status = '';
            if (event instanceof HttpResponse) {
              status = 'succeeded';
            }
          },
          error => status = 'failed'
        ),
        finalize(() => {
          const elapsedTime = Date.now() - startTime;
          const message = req.method + " " + req.urlWithParams +" "+ status
          + " in " + elapsedTime + "ms";

          this.logDetails(message);
        })
    );
  }
  private logDetails(msg: string) {
    console.log(msg);
  }
}
