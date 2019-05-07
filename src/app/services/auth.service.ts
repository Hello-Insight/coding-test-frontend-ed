import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isAuthenticated(): boolean {
    let helper = new JwtHelperService();
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !helper.isTokenExpired(token);
  }
  
  public identity() : string {
    let helper = new JwtHelperService();
    const token = sessionStorage.getItem('token');
    return "" + helper.decodeToken(token).identity;
  }
  
}
