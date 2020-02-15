import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/model/movie';
import { SearchComponent } from 'src/app/custom-header/search/search.component';
import { SharedVarService } from 'src/app/custom-header/search/sharedvar';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(private moviesService: MoviesService, private service: SharedVarService) { }

  movies: Movie[] = [];
  filter = 'batman';
  error: any = { 
    type: 'Error',
    message: 'Type on the search input to find your movie. OBS: type the title of the movie'
  };
  loading: boolean = false;
  flagFirstTime = true;

  titleString = '';
  lastTitleString = '';
  count: number = 0;

  ngOnInit(): void {
    this.subscribeToSearch();
    this.flagFirstTime = false;
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
      if (movieResponse.Error) {
        this.error = {
          type: "Error",
          message: this.titleString === '' ? 'Type on the search input to find your movie. OBS: type the title of the movie' : movieResponse.Error
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

  subscribeToSearch() {
    this.service.getValue().subscribe((titleString) => {
      if (!this.flagFirstTime) {
        this.titleString = titleString;
        this.loadMovies();
      }
    })
  }
}
