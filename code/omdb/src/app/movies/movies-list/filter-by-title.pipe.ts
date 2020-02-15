import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from 'src/app/model/movie';

@Pipe({ name: 'filterByTitle'})
export class FilterByTitle implements PipeTransform {

    transform(movies: Movie[], titleQuery: string) {
        titleQuery = titleQuery
            .trim()
            .toLowerCase();

        if(titleQuery) {
            return movies.filter(movie => 
                movie.Title.toLowerCase().includes(titleQuery)
            );
        } else {
            return movies;
        }
    }

}