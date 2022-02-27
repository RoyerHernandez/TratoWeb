import { Component, OnInit } from '@angular/core';
import { images } from '../banner/images.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  image: images[] = [
    {
      id: 1,
      title: 'Banner 1',
      description: 'Trato Principal',
      image: 'assets/images/banner-1.jpg'
    },
    {
      id: 2,
      title: 'Banner 2',
      description: 'Trato Principal',
      image: 'assets/images/banner-2.jpg'
    },
    {
      id: 3,
      title: 'Banner 3',
      description: 'Trato Principal',
      image: 'assets/images/banner-3.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
