import { Injectable } from '@angular/core';
import { product } from '../../../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: product[] = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      title: 'Esmeralda Natural 2.3ct',
      price: 1250000,
      description: 'Esmeralda natural colombiana certificada. Origen Muzo, Boyacá. Color verde intenso.'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
      title: 'Reloj Seiko SPB143',
      price: 1750000,
      description: 'Seiko Prospex automático. Cristal zafiro, resistencia al agua 200m. Caja completa.'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
      title: 'Collar Oro 18K + Esmeralda',
      price: 2100000,
      description: 'Collar artesanal en oro 18K con esmeralda central colombiana certificada.'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      title: 'Air Jordan 1 Retro — T42',
      price: 680000,
      description: 'Nike Air Jordan 1 Retro High OG originales, talla 42. Sin uso, caja sellada.'
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      title: 'MacBook Pro M3 Pro 14"',
      price: 7500000,
      description: 'MacBook Pro M3 Pro, 18GB RAM, 512GB SSD. 2500 disparos de uso.'
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80',
      title: 'Guitarra Acústica Luthier',
      price: 4200000,
      description: 'Guitarra artesanal colombiana de luthier bogotano. Cedro y palisandro.'
    }
  ];

  GetAllProducts() {
    return this.products;
  }

  GetProduct(id: string) {
    return this.products.find(item => id === item.id);
  }

  constructor() { }
}
