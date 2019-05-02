import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
import { ComicService } from '../../services/comic.service';
import { Comic } from '../../interfaces/comic';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  comic : Comic = {
    id: null,
    month: null,
    num: null,
    link: null,
    year: null,
    news: null,
    safe_title: null,
    transcript: null,
    alt: null,
    img: null,
    title: null,
    day: null
  }
  
  comics : Comic[] = [];

  constructor( private comicService:ComicService ) { }

  ngOnInit() {
    this.comics = this.comicService.getMockComics();
    console.log(this.comics);
  }
  
  getRandomComic() {
    this.comicService.getLast().subscribe( comic => {
      const LAST = comic.num;
      const RANDOM = Math.floor((Math.random() * LAST) + 1);
      this.comicService.getComic(RANDOM).subscribe( randomComic => {
        this.comic = randomComic;
      });
    });
  }

  queryComic( num:number ) {
    this.comicService.getLast().subscribe( comic => {
      const LAST = comic.num;
      if (num > LAST || num <= 0) {
        num = LAST;
      }
      this.comicService.getComic(num).subscribe( randomComic => {
        this.comic = randomComic;
      });
    });
  }

}
