import { Component, OnInit, ViewChild } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { MoviesService } from '../services/movies.service';
import { SharedVarService } from '../custom-header/search/sharedvar';
import { Movie } from '../model/movie';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private service: SharedVarService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.titleService.setTitle("Diamond OMDB Home");
  }

  movieID: string = '';
  movies: Movie[] = [];
  error: any = {};
  loading: boolean = false;
  flagFirstTime: boolean = true;
  buttonActive = false;
  totalResults: number = 0;
  maxMoviesLength: number = 10;
  titleString: string = '';
  lastTitleString: string = '';
  count: number = 0;
  movieDetail: Movie;

  ngOnInit(): void {
    this.movieID = this.activatedRoute.snapshot.params.id;
    if (!this.movieID) {
      this.error = { 
        type: 'Error',
        message: 'Type on the search input to find your movie.'
      };
    }
    this.subscribeToSearch();
    this.flagFirstTime = false;
  }

  movieSelected(movie: Movie) {
    this.loadMovieByImdbId(movie.imdbID);
  }

  loadMovies() {
    this.loading = true;
    this.error = false;
    if (this.lastTitleString === this.titleString) {
      this.count++;
    } else {
      this.movies = [];
      this.count = 1;
    }

    this.moviesService.listMoviesByTitle(this.titleString, this.count).then(movieResponse => {
      this.buttonActive = !(Number.parseInt(movieResponse.totalResults)/this.maxMoviesLength < this.count);
      if (movieResponse.Error) {
        this.error = {
          type: "Error",
          message: this.titleString === '' ? 'Type on the search input to find your movie.' : movieResponse.Error
        };
        this.movies = [];
      } else {
        let offset = 0;
        movieResponse.Search.forEach(movie => {
          setTimeout(()=>{
            this.movies.push(movie);
          }, offset);
          offset += 300;
        });
        this.lastTitleString = this.titleString;
        this.error = {};
      }
    }).catch(e => {
      this.error = {
        type: e.name,
        message: e.message
      }
    }).finally(()=> {      
      this.loading = false;
    });  
  }  

  async loadMovieByImdbId(imdbID: string) {
      this.loading = true;
    try {
      const res = await this.moviesService.getMovieByImdbId(imdbID);
      if (res.Error) {
        throw res;
      }
      const t = {
        id: imdbID,
        likes: 0
      }
      this.movieDetail = res;
    } catch(e) {
      this.error = {
        type: "Error",
        message: e.Error
      }
    } finally {
      this.loading = false;
      this.buttonActive = false;
    }
  }

  subscribeToSearch() {
    this.service.getValue().subscribe((titleString) => {
      if (!this.flagFirstTime && (!this.movieID || titleString)) {
        this.titleString = titleString;
        this.totalResults = 0;
        this.movieID = '';
        this.movieDetail = null;
        this.location.replaceState(`/movies`);
        this.loadMovies();
      } else if (this.movieID){
        this.loadMovieByImdbId(this.movieID);
      }
    })
  }
}
