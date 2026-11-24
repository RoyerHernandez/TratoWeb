import { Injectable } from '@angular/core';
import { auctions } from '../../../auctions/auctions.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  auction: auctions[] = [
    {
      id: '1',
      product_name: 'Esmeralda Natural 2.3ct — Certificada',
      categoryLabel: 'Joyería',
      bidValue: 1250000,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      startValue: '01:48:00',
      bidState: 'ending',
      description: 'Esmeralda natural colombiana de 2.3 quilates. Origen: Muzo, Boyacá.',
      totalBids: 23,
      location: 'Bogotá D.C.'
    },
    {
      id: '2',
      product_name: 'Reloj Seiko Automático SPB143',
      categoryLabel: 'Relojes',
      bidValue: 1750000,
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
      startValue: '05:22:00',
      bidState: 'active',
      description: 'Seiko Prospex automático, cristal zafiro, resistencia 200m. Caja completa.',
      totalBids: 17,
      location: 'Medellín'
    },
    {
      id: '3',
      product_name: 'iPhone 15 Pro 256GB Titanio Natural',
      categoryLabel: 'Tecnología',
      bidValue: 3200000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
      startValue: '11:05:00',
      bidState: 'active',
      description: 'iPhone 15 Pro, 256GB, Titanio Natural. Estado impecable, caja original.',
      totalBids: 31,
      location: 'Bogotá D.C.'
    },
    {
      id: '4',
      product_name: 'Collar Oro 18K con Esmeralda',
      categoryLabel: 'Joyería',
      bidValue: 2100000,
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
      startValue: '08:30:00',
      bidState: 'active',
      description: 'Collar en oro 18K con esmeralda central colombiana certificada.',
      totalBids: 12,
      location: 'Bogotá D.C.'
    },
    {
      id: '5',
      product_name: 'Nike Air Jordan 1 Retro — Talla 42',
      categoryLabel: 'Moda',
      bidValue: 680000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      startValue: '03:15:00',
      bidState: 'ending',
      description: 'Jordan 1 Retro High OG originales, talla 42. Sin uso, caja sellada.',
      totalBids: 8,
      location: 'Cali'
    },
    {
      id: '6',
      product_name: 'MacBook Pro M3 Pro 14" — 18GB/512GB',
      categoryLabel: 'Tecnología',
      bidValue: 7500000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      startValue: '14:00:00',
      bidState: 'active',
      description: 'MacBook Pro M3 Pro, 14 pulgadas, 18GB RAM, 512GB SSD. 2500 disparos.',
      totalBids: 44,
      location: 'Bogotá D.C.'
    },
    {
      id: '7',
      product_name: 'Anillo Esmeralda Baguette Oro 18K',
      categoryLabel: 'Joyería',
      bidValue: 1850000,
      image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80',
      startValue: '06:45:00',
      bidState: 'active',
      description: 'Anillo en oro 18K con esmeraldas baguette colombianas. Talla 7.',
      totalBids: 9,
      location: 'Bogotá D.C.'
    },
    {
      id: '8',
      product_name: 'Sony Alpha A7IV Body',
      categoryLabel: 'Tecnología',
      bidValue: 5900000,
      image: 'https://images.unsplash.com/photo-1617957796013-1a08f0e70878?w=600&q=80',
      startValue: '09:20:00',
      bidState: 'active',
      description: 'Sony A7IV, 33MP, 2500 disparos. Excelente estado, con caja y accesorios.',
      totalBids: 19,
      location: 'Medellín'
    },
    {
      id: '9',
      product_name: 'Guitarra Acústica de Luthier',
      categoryLabel: 'Instrumentos',
      bidValue: 4200000,
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80',
      startValue: '02:10:00',
      bidState: 'ending',
      description: 'Guitarra acústica artesanal, cedro y palisandro. Luthier bogotano.',
      totalBids: 46,
      location: 'Bogotá D.C.'
    }
  ];

  GetAllAuctions() {
    return this.auction;
  }

  GetAuction(id: string) {
    return this.auction.find(item => id === item.id);
  }
}
