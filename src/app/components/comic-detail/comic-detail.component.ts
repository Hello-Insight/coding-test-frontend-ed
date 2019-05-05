import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ComicService } from '../../services/comic.service';
import { Comic } from '../../interfaces/comic';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {

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
  date = null;

  constructor( private router:Router,
               private activatedRoute:ActivatedRoute,
               private comicService:ComicService ) { }

  ngOnInit() {
     this.activatedRoute.params.subscribe( params => { 
       this.comicService.getAllComics().subscribe( comics => {
         this.comic = comics.filter(x => x.id == params['id'])[0];
         this.setDate();
      });
   });
  }

  alertClosed() {
    this.success = false;
  }

  deleteComic () {
    this.comicService.deleteComic( this.comic.id ).subscribe( res => {
      this.router.navigate(['/comics']);
    });
  }

  setDate() {
    this.date = (new Date()).setFullYear(parseInt(this.comic.year),
                parseInt(this.comic.month) - 1, 
                parseInt(this.comic.day));
  }

  updateComic ( comic:Comic ) {

    this.comicService.updateComic( comic ).subscribe( res => {

      if (res == undefined) {

        this.error = true;

      } else {

        console.log("res", res);

        this.success = true;
        this.error = false;
        this.setDate();

      }

    });

  }

}
