import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../../services/comic.service';
import { Comic } from '../../interfaces/comic';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  comics : Comic[] = [];
  tag : string = "";

  constructor( private comicService:ComicService,
               private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.tag = params['tag'];
      this.comicService.searchComics( params['tag'] ).subscribe( comics => {
        this.comics = comics;
      });
    });
  }

}
