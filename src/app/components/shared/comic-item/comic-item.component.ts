import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../../../interfaces/comic';

@Component({
  selector: 'app-comic-item',
  templateUrl: './comic-item.component.html',
  styleUrls: ['./comic-item.component.css']
})
export class ComicItemComponent implements OnInit {

  @Input() comic : Comic = {
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

  constructor() { }

  ngOnInit() {
  }

}
