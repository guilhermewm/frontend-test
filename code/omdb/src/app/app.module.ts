import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieComponent } from './movies/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { SearchComponent } from './custom-header/search/search.component';
import { ErrorsComponent } from './shared/errors/errors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxLoadingModule } from 'ngx-loading';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomHeaderComponent,
    MoviesListComponent,
    MovieComponent,
    SearchComponent,    
    ErrorsComponent,
    MovieDetailComponent,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
