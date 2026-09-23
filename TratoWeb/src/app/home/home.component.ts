import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper, { Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  mySwiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination]
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
      this.mySwiper = new Swiper('.swiper-container');
  }

}
