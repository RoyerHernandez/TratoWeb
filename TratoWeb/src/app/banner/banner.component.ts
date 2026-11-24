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
      title: 'Joyería colombiana',
      description: 'Esmeraldas de Muzo, oro 18K y piezas únicas de los mejores joyeros del país.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80'
    },
    {
      id: 2,
      title: 'Relojes y vintage',
      description: 'Seikos, Casios y relojes de colección. Encuentra tu próximo tesoro.',
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80'
    },
    {
      id: 3,
      title: 'Arte y coleccionables',
      description: 'Cuadros, figuras y objetos únicos que llegan cada semana a subasta.',
      image: 'https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?w=1200&q=80'
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
