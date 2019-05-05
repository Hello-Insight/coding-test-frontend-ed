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
  updatedComic : string = "";
  date = null;

  constructor( private router:Router,
               private activatedRoute:ActivatedRoute,
               private comicService:ComicService ) { }

  ngOnInit() {
     this.activatedRoute.params.subscribe( params => { 
       this.comicService.getAllComics().subscribe( comics => {
         this.comic = comics.filter(x => x.id == params['id'])[0];
         this.date = (new Date()).setFullYear(parseInt(this.comic.year),
                                  parseInt(this.comic.month) - 1, 
                                  parseInt(this.comic.day));
         console.log(this.comic);
      });
   });
  }

  alertClosed() {
    this.success = false;
    this.updatedComic  = ""; 
  }

  deleteComic () {
    this.comicService.deleteComic( this.comic.id ).subscribe( res => {
      this.router.navigate(['/comics']);
    });
  }

}
