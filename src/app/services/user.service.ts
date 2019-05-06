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
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': 'JWT ' + sessionStorage.getItem("token") })
  };

  constructor( private http: HttpClient,
               private error: ErrorService ) { }

  public createUser( user : User ) : Observable<Response> {

    delete user["id"];

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

  public getId( email : string ) : Observable<Response> {
    return this.http.get<Response>( this.env.api_url + '/user/login?email=' + email, this.httpOptions );
  }

  public updateUser( user : User ) : Observable<Response> {

    return this.http.post( this.env.api_url + '/user', user, this.httpOptions ).pipe(
      tap((res:Response) => console.log('updated user: ', res)),
      catchError(this.error.handleError<Response>('updateUser'))
    );

  }
  
  public auth( user : User ) : Observable<any> {

    let usr = { username: user.email, password: user.password };

    return this.http.post( this.env.api_url + '/auth', usr, this.httpOptions ).pipe(
      tap((res:any) => console.log('token: ', res)),
      catchError(this.error.handleError<any>('auth'))
    );

  }

}
