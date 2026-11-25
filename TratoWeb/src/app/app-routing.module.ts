import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExchangesComponent } from './exchanges/exchanges.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { SellerComponent } from './seller/seller.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
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
    path: 'products',
    component: ProductsComponent
  },{
    path: 'products/:id',
    component: ProductDetailComponent
  },{
    path:'contact',
    component: ContactComponent
  },
  {
    path: 'scheduled',
    component: ScheduledComponent
  },
  {
    path: 'seller',
    component: SellerComponent
  },
  {
    path: 'onboarding',
    component: OnboardingComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
