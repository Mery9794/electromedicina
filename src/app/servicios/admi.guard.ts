import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdmiGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          const isAdmin = user?.email === 'sol9794@gmail.com';
          if (isAdmin) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
