export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string | string[];
    Director: string | string[];
    Writer: string | string[];
    Actors: string | string[];
    Plot: string;
    Language: string | string[];
    Country: string;
    Awards: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string | string[];
    Website: string;
    Response: string; 
    Error: string; 
}

export interface Rating {      
    Source: string;
    Value: string;
}

export interface MovieResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error: string;
}
