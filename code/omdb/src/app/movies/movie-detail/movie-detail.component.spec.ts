import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Movie } from 'src/app/model/movie';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change data values from movies that dont have values and create array', () => {
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
    component.movie = mockMovie;
    component.adjustData(component.movie);
    expect(component.movie.Website).toBe(component.notFoundMessage);
    expect(component.movie.Writer).toEqual(["J.R.R. Tolkien (novel)", "Fran Walsh (screenplay)", "Philippa Boyens (screenplay)", "Peter Jackson (screenplay)"]);
  });

  it('should change like the movie', () => {

    const mockLikes = component.likes;
    component.liked();
    expect(component.likes).toBe(mockLikes+1);
    });
});
