import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExchangesComponent } from './exchanges/exchanges.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'categories',
    component: CategoriesComponent
  },
  {
    path:'exchanges',
    component: ExchangesComponent
  },
  {
    path:'auctions',
    component: AuctionsComponent
  },{
    path:'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
