import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import {Location} from '@angular/common';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  @Input() movies: Movie[] = [];
  @Output() movieSelected = new EventEmitter<Movie>(); 
  
  ngOnInit(): void {
  }

  openMovie(movie: Movie) {    
    this.location.replaceState(`/movies/${movie.imdbID}`);
    this.movieSelected.emit(movie);
  }
}
