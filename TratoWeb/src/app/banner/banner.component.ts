import { Component, OnInit, OnDestroy } from '@angular/core';
import { images } from '../banner/images.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {

  image: images[] = [
    {
      id: 1,
      title: 'Relojes de colección',
      description: 'Piezas seleccionadas en subasta especial.',
      image: 'assets/images/banner/banner-1.jpg'
    },
    {
      id: 2,
      title: 'Arte y coleccionables',
      description: 'Cuadros, figuras y objetos únicos cada semana.',
      image: 'assets/images/banner/banner-2.jpg'
    },
    {
      id: 3,
      title: 'Instrumentos musicales',
      description: 'Guitarras, pianos y más en subasta.',
      image: 'assets/images/banner/banner-3.jpg'
    }
  ];

  currentIndex = 0;
  private timer: any;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  startAutoplay() {
    this.timer = setInterval(() => this.next(), 5000);
  }

  pauseAutoplay() {
    clearInterval(this.timer);
  }

  resumeAutoplay() {
    this.startAutoplay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.image.length) % this.image.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.image.length;
  }

  goTo(i: number) {
    this.currentIndex = i;
  }

  get translateX() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}
