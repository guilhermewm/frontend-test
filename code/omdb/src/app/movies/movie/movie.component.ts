import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  constructor(private location: Location) { }

  teste(ev) {
    console.log(ev);
    this.location.replaceState("/some/newstate/");
  }
  ngOnInit(): void {
  }

}
