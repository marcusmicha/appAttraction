import { ApiService } from '../service/api.service';
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable,  } from 'rxjs';
import { EMPTY } from 'rxjs'
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiResolver implements Resolve<any[]> {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    console.log("hello");
    return this.apiService.getAll("")
      .pipe(catchError((err) => {
        console.error(err); // deal with API error (eg not found)
        return EMPTY;
      }
    )
    );
  }
}
