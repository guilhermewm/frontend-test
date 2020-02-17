import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MovieResponse, Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  API = environment.baseUrl;

  constructor(private http: HttpClient) { }
    
  listMoviesByTitle(title: string, page: number): Promise<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.API}&s=${title}&plot=full&page=${page}`).toPromise();       
  }

  getMovieByImdbId(imdbID: string): Promise<Movie> {
    return this.http.get<Movie>(`${this.API}&i=${imdbID}&plot=full`).toPromise();       
  }
}
