import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Comic } from '../interfaces/comic';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  env = environment;
  lastURL:string = "https://xkcd.now.sh/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient,
               private error: ErrorService ) { }

  public getLast() : Observable<Comic> {
    return this.http.get<Comic>(this.lastURL, this.httpOptions);
  }
  
  public getComic( num:number ) : Observable<Comic> {
    return this.http.get<Comic>(this.lastURL + num, this.httpOptions);
  }

  public createComic( comic : Comic ) : Observable<Response> {

    delete comic["id"];

    console.log("comic", comic);

    return this.http.post( this.env.api_url + '/comic/', comic, this.httpOptions ).pipe(
      tap((res:Response) => console.log('created comic: ', res)),
      catchError(this.error.handleError<Response>('createComic'))
    );

  }

  public getAllComics() : Observable<Comic[]> {
    return this.http.get<Comic[]>( this.env.api_url + '/comic/', this.httpOptions );
  }

  public deleteComic( id:string ) : Observable<Response> {
    return this.http.delete<Response>( this.env.api_url + '/comic/' + id, this.httpOptions );
  }

}
