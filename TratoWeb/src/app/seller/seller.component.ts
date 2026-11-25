import { Component, OnInit } from '@angular/core';

export interface Seller {
  id: string;
  name: string;
  initials: string;
  tagline: string;
  gradient: string;
  badges: string[];
  location: string;
  memberSince: string;
  rating: number;
  sales: number;
  activeListings: number;
  followers: number;
  deliveryRate: number;
  verification: { cedula: boolean; facial: boolean; phone: boolean };
  ratingDistribution: { [key: number]: number };
  bio: string;
}

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  seller!: Seller;
  activeTab = 'auctions';
  following = false;
  toastMsg = '';
  toastVisible = false;
  private toastTimer: any;

  readonly sellerData: Seller = {
    id: 'maru-joyeria',
    name: 'Maru Joyería',
    initials: 'MJ',
    tagline: 'Esmeraldas Colombianas · Joyería Artesanal',
    gradient: 'linear-gradient(135deg, #8B2FC9 0%, #3CBCB8 100%)',
    badges: ['✅ Identidad verificada', '💎 Esmeraldas', '🏆 Top Vendedor'],
    location: 'Bogotá, Colombia',
    memberSince: 'mar 2023',
    rating: 4.9,
    sales: 247,
    activeListings: 8,
    followers: 1200,
    deliveryRate: 98,
    verification: { cedula: true, facial: true, phone: true },
    ratingDistribution: { 5: 92, 4: 6, 3: 2, 2: 0, 1: 0 },
    bio: 'Especialistas en esmeraldas colombianas y joyería artesanal fina. Más de 15 años de experiencia en el mercado de Bogotá. Todas nuestras piedras tienen certificado de origen.',
  };

  readonly sellerAuctions = [
    {
      id: 1, name: 'Esmeralda Natural 2.3ct — Certificada',
      categoryLabel: 'Joyería', bids: 23, price: '$1.250.000',
      timer: '01:48:00', bidState: 'ending',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'
    },
    {
      id: 2, name: 'Collar Oro 18K con Esmeralda',
      categoryLabel: 'Joyería', bids: 12, price: '$2.100.000',
      timer: '08:30:00', bidState: 'active',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80'
    },
    {
      id: 3, name: 'Anillo Esmeralda Baguette Oro 18K',
      categoryLabel: 'Joyería', bids: 9, price: '$1.850.000',
      timer: '06:45:00', bidState: 'active',
      image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80'
    },
  ];

  readonly starBars = [5, 4, 3, 2, 1];

  ngOnInit() {
    this.seller = this.sellerData;
  }

  get followersLabel(): string {
    return this.seller.followers >= 1000
      ? (this.seller.followers / 1000).toFixed(1) + 'K'
      : String(this.seller.followers);
  }

  setTab(tab: string) { this.activeTab = tab; }

  toggleFollow() {
    this.following = !this.following;
    this.showToast(this.following
      ? `¡Ahora sigues a ${this.seller.name}!`
      : `Dejaste de seguir a ${this.seller.name}`);
  }

  contact() { this.showToast(`Abriendo chat con ${this.seller.name}...`); }

  showToast(msg: string) {
    clearTimeout(this.toastTimer);
    this.toastMsg = msg;
    this.toastVisible = true;
    this.toastTimer = setTimeout(() => this.toastVisible = false, 2800);
  }
}
