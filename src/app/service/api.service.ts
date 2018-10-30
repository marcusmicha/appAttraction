import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ApiService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll(asset): Observable<any> {
    return this.http.get(this.url + '/' + asset + '?_sort=id&_order=desc')
      .pipe(map(res => {
          return res;
      }));
    }
  
  post(asset, body): Observable<any> {
    return this.http.post(this.url + '/' + asset, body)
    .pipe();
  }

  put(asset, body): Observable<any> {
    return this.http.put(this.url + '/' + asset + '/' + body.id, body)
    .pipe();
  }

  delete(asset, id): Observable<any> {
    return this.http.delete(this.url + '/' + asset + '/' + id)
    .pipe();
  }
}