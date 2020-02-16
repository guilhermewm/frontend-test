import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: 'movies', component: HomeComponent},
  { path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  { 
    path: 'movies/:id', 
    component: HomeComponent
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
