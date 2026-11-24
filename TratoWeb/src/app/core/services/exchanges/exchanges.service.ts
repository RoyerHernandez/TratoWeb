import { Injectable } from '@angular/core';
import { exchanges } from '../../../exchanges/exchanges.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  exchanges: exchanges[] = [
    {
      id: '1',
      productName: 'Cámara Fujifilm X-T5',
      exchangesValue: '$4.800.000',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
      startValue: '05:00',
      exchangesState: 'Activo',
      description: 'Cámara mirrorless Fujifilm X-T5. Busco intercambio por Sony o Nikon.'
    },
    {
      id: '2',
      productName: 'Bicicleta Trek Marlin 7 — 2023',
      exchangesValue: '$3.200.000',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
      startValue: '05:00',
      exchangesState: 'Activo',
      description: 'Trek Marlin 7, talla M, 2023. Cambio por bici de ruta o electrónica.'
    },
    {
      id: '3',
      productName: 'Smart TV Samsung 55" QLED',
      exchangesValue: '$2.900.000',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
      startValue: '05:00',
      exchangesState: 'Activo',
      description: 'Samsung QLED 55", 4K, 2022. Intercambio por laptop o tablet.'
    },
    {
      id: '4',
      productName: 'Colección Viniles — 45 discos',
      exchangesValue: '$1.500.000',
      image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=600&q=80',
      startValue: '05:00',
      exchangesState: 'Activo',
      description: '45 vinilos originales, rock clásico y jazz. Cambio por equipos de audio.'
    },
    {
      id: '5',
      productName: 'iPad Pro M2 11" 256GB',
      exchangesValue: '$4.100.000',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
      startValue: '05:00',
      exchangesState: 'Activo',
      description: 'iPad Pro M2 11", 256GB WiFi. Intercambio por MacBook o cámara.'
    },
    {
      id: '6',
      productName: 'Moto Honda CB 300R — 2022',
      exchangesValue: '$9.500.000',
      image: 'https://images.unsplash.com/photo-1558980664-28d10ee9bb52?w=600&q=80',
      startValue: '05:00',
      exchangesState: 'Activo',
      description: 'Honda CB 300R 2022, 8.000 km. Cambio por moto de mayor cilindraje.'
    }
  ];

  getAllExchanges() {
    return this.exchanges;
  }

  getExchange(id: string) {
    return this.exchanges.find(item => id === item.id);
  }
}
