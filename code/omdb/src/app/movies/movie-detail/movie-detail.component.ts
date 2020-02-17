import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie = {} as Movie;
  likes: number = 0;
  notFoundMessage = 'Informations not found.';

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {   
    const data = JSON.parse(sessionStorage.getItem('likes')) as [];
    if (data) {
      data.find((res: any) => {
        if (res.imdbID === this.movie.imdbID) {
          this.likes = res.likes;
        }
      })
    }
    if (this.movie)
      this.adjustData(this.movie);
  }

  liked() {
    const data = JSON.parse(sessionStorage.getItem('likes')) || [];
    if(data && data.find((res: any) => res.imdbID === this.movie.imdbID)){
      data.map((res: any) => {
        if (res.imdbID === this.movie.imdbID) {
          this.likes++;
          return res.likes++;
        }
      });
    } else {
      data.push({
        imdbID: this.movie.imdbID,
        likes: this.likes+1
      });
      this.likes++;
    }
    sessionStorage.setItem('likes', JSON.stringify(data));
  }

  adjustData(movie: Movie) {
    for (var key of Object.keys(movie)) {
      if (key !== 'Poster' && movie[key] === "N/A") {
        this.movie[key] = this.notFoundMessage;
      }
      if (key === 'Genre' 
        || key === 'Director' 
        || key === 'Writer'
        || key === 'Actors'
        || key === 'Language'
        || key === 'Production') {
          this.createArrayFromString(this.movie[key] as string, key);
      } 
    }
  }

  createArrayFromString(value: string, key: string) {
    this.movie[key] = value.split(", ");
  }

  backPage() {    
    this.location.replaceState('/movies');
    location.reload();
  }
}
