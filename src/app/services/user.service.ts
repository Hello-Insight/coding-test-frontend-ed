import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { User } from '../interfaces/user';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  env = environment;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient,
               private error: ErrorService ) { }

  public createUser( user : User ) : Observable<Response> {

    delete user["id"];

    console.log("user", user);

    return this.http.post( this.env.api_url + '/user', user, this.httpOptions ).pipe(
      tap((res:Response) => console.log('created user: ', res)),
      catchError(this.error.handleError<Response>('createUser'))
    );

  }

  public login( user : User ) : Observable<Response> {
    return this.http.post( this.env.api_url + '/user/login', user, this.httpOptions ).pipe(
      tap((res:Response) => console.log('log in: ', res)),
      catchError(this.error.handleError<Response>('login'))
    );
  }
  
  public logout() : Observable<Response> {
    return this.http.post( this.env.api_url + '/user/logout', {}, this.httpOptions ).pipe(
      tap((res:Response) => console.log('log out: ', res)),
      catchError(this.error.handleError<Response>('logout'))
    );
  }

}
