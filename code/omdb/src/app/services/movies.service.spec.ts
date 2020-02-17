import { TestBed, inject  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/movie';

describe('MoviesService', () => {
  const API = environment.baseUrl;

  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', inject([MoviesService], (service: MoviesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get movies by title',
    inject(
      [
        HttpTestingController, 
        MoviesService
      ],
      (
        httpMock: HttpTestingController,
        moviesService: MoviesService
      ) => {
        const mockMovie: string = 'batman';

        moviesService.listMoviesByTitle(mockMovie, 1).then((res) => {
          if (res) {
            expect(res[0].Title).toContain(mockMovie);
          }
        });

        const mockReq = httpMock.expectOne(`${API}&s=${mockMovie}&plot=full&page=1`);

        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');

        httpMock.verify();
      }
    )
  );

  it('should get movie by imdbID',
    inject(
      [
        HttpTestingController, 
        MoviesService
      ],
      (
        httpMock: HttpTestingController,
        moviesService: MoviesService
      ) => {
        const mockMovie: Movie = {
          "Title": "The Lord of the Rings: The Fellowship of the Ring",
          "Year": "2001",
          "Rated": "PG-13",
          "Released": "19 Dec 2001",
          "Runtime": "178 min",
          "Genre": "Adventure, Drama, Fantasy",
          "Director": "Peter Jackson",
          "Writer": "J.R.R. Tolkien (novel), Fran Walsh (screenplay), Philippa Boyens (screenplay), Peter Jackson (screenplay)",
          "Actors": "Alan Howard, Noel Appleby, Sean Astin, Sala Baker",
          "Plot": "An ancient Ring thought lost for centuries has been found, and through a strange twist in fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it! However he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir and his three Hobbit friends Merry, Pippin and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign!",
          "Language": "English, Sindarin",
          "Country": "New Zealand, USA",
          "Awards": "Won 4 Oscars. Another 115 wins & 124 nominations.",
          "Poster": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
          "Ratings": [
              {
                  "Source": "Internet Movie Database",
                  "Value": "8.8/10"
              },
              {
                  "Source": "Rotten Tomatoes",
                  "Value": "91%"
              },
              {
                  "Source": "Metacritic",
                  "Value": "92/100"
              }
            ],
            "Metascore": "92",
            "imdbRating": "8.8",
            "imdbVotes": "1,568,706",
            "imdbID": "tt0120737",
            "Type": "movie",
            "DVD": "06 Aug 2002",
            "BoxOffice": "$314,000,000",
            "Production": "New Line Cinema",
            "Website": "N/A",
            "Response": "True",
            "Error": null
        };

        moviesService.getMovieByImdbId(mockMovie.imdbID).then((res) => {
          if (res) {
            expect(res).toEqual(mockMovie);
          }
        });

        const mockReq = httpMock.expectOne(`${API}&i=${mockMovie.imdbID}&plot=full`);

        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');

        httpMock.verify();
      }
    )
  );
});
