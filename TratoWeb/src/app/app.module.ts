import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { ExchangesComponent } from './exchanges/exchanges.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { HighlightDirective } from './shared/directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    ContactComponent,
    ExchangesComponent,
    AuctionsComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ProductsComponent,
    ProductComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
