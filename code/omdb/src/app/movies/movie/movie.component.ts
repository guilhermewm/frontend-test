import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie = {} as Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
