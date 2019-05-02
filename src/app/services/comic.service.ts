import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Comic } from '../interfaces/comic';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

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

  public getMockComics() : Comic[] {
  
    var comics: Comic[] = [ { "id": "5a453cfd99b423000bc1d555", "month": "6", "num": 111, "link": "", "year": "2006", "news": "", "safe_title": "Firefox and Witchcraft - The Connection?", "transcript": "membership in wicca\ntotal firefox downloads\n[[positive slope graph]]\n[[Internet Explorer icon]]\nKeep the Faith\n[[Outline of a cross]]", "alt": "ThisadpaidforbythecounciltopromoteMicrosoftandChristianity. Remember, The Bible is Closed Source.", "img": "https://imgs.xkcd.com/comics/firefox_wicca.png", "title": "Firefox and Witchcraft - The Connection?", "day": "5" }, { "id": "5a453cfd99b423000bc1d556", "month": "12", "num": 1045, "link": "", "year": "2008", "news": "", "safe_title": "Web Browsers", "transcript": "this is just an example of Chrome and Firefox", "title": "Chrome and Firefox", "day": "23", "alt": "ThisadpaidforbythecounciltopromoteMicrosoftandChristianity. Remember, The Bible is Closed Source.", "img": "https://imgs.xkcd.com/comics/firefox_wicca.png" } ];
  
    return comics;
  
  }


}
