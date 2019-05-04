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
    month: " ",
    num: 0,
    link: " ",
    year: " ",
    news: " ",
    safe_title: " ",
    transcript: " ",
    alt: " ",
    img: " ",
    title: " ",
    day: " "
  }
  
  success : boolean = false;
  error : boolean = false;
  createdComic : string = ""; 
  
  comics : Comic[] = [];

  constructor( private comicService:ComicService ) { }

  ngOnInit() {
    this.comicService.getAllComics().subscribe( comics => {
        this.comics = comics;
    });
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
      this.comicService.getComic(num).subscribe( queryComic => {
        this.comic = queryComic;
      });
    });
  }
  
  createComic ( comic:Comic ) {

    this.comicService.createComic( comic ).subscribe( res => {

      if (res == undefined) {

        this.error = true;

      } else {

        console.log("res", res);

        this.createdComic = "" + comic.num;
        this.success = true;
        this.error = false;

        this.comic = {
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

        this.comicService.getAllComics().subscribe( comics => {
          this.comics = comics;
        });

      }

    });

  }
  
  alertClosed() {
    this.success = false;
    this.createdComic  = ""; 
  }

}
