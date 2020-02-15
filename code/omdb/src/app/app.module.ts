import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieComponent } from './movies/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterByTitle } from './movies/movies-list/filter-by-title.pipe';
import { SearchComponent } from './custom-header/search/search.component';
import { SharedVarService } from './custom-header/search/sharedvar';
import { LoaderComponent } from './shared/loader/loader.component';
import { ErrorsComponent } from './shared/errors/errors.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomHeaderComponent,
    MoviesListComponent,
    MovieComponent,
    FilterByTitle,
    SearchComponent,    
    ErrorsComponent,
    LoaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
