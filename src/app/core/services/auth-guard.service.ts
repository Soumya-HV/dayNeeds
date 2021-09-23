import { AuthenticationService } from "../services/authentication.service";
import { Injectable } from "@angular/core";
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigateByUrl("/welcome");
    }
    return this.authService.getToken();
  }
}