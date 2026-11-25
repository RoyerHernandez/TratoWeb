import { Component } from '@angular/core';

export interface Notif {
  id: number;
  icon: 'hammer' | 'clock' | 'trophy' | 'payment' | 'store';
  title: string;
  body: string;
  ago: string;
  read: boolean;
  actionLabel?: string;
  actionRoute?: string;
  group: 'hoy' | 'ayer';
  tab: 'pujas' | 'ventas' | 'pagos';
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  activeTab: 'todas' | 'pujas' | 'ventas' | 'pagos' = 'todas';

  notifs: Notif[] = [
    {
      id: 1, icon: 'hammer',
      title: 'Superaron tu puja',
      body: 'Alguien ofreció $ 4.400.000 por Guitarra acústica de luthier.',
      ago: 'Hace 5 min', read: false,
      actionLabel: 'Pujar de nuevo', actionRoute: '/auctions',
      group: 'hoy', tab: 'pujas'
    },
    {
      id: 2, icon: 'hammer',
      title: 'Nueva puja en tu subasta',
      body: 'Reloj de bolsillo plateado, c. 1920 recibió una puja de $ 1.250.000.',
      ago: 'Hace 40 min', read: false,
      actionLabel: 'Ver subasta', actionRoute: '/auctions',
      group: 'hoy', tab: 'ventas'
    },
    {
      id: 3, icon: 'clock',
      title: 'Está por terminar',
      body: 'Quedan 30 minutos para que cierre Cámara analógica de 35 mm, que tienes en favoritos.',
      ago: 'Hace 1 h', read: true,
      actionLabel: 'Ver subasta', actionRoute: '/auctions',
      group: 'hoy', tab: 'pujas'
    },
    {
      id: 4, icon: 'trophy',
      title: '¡Ganaste la subasta!',
      body: 'Felicidades, ganaste Anillo de oro con esmeralda por $ 3.800.000.',
      ago: 'Hace 5 h', read: false,
      actionLabel: 'Ver detalle', actionRoute: '/dashboard',
      group: 'ayer', tab: 'pujas'
    },
    {
      id: 5, icon: 'payment',
      title: 'Pago recibido',
      body: 'Recibiste $ 2.100.000 por Brazalete de plata artesanal.',
      ago: 'Hace 8 h', read: true,
      actionLabel: 'Ver transacción', actionRoute: '/dashboard',
      group: 'ayer', tab: 'pagos'
    },
    {
      id: 6, icon: 'store',
      title: 'Subasta publicada',
      body: 'Tu subasta Collar de perlas cultivadas está activa y recibiendo pujas.',
      ago: 'Ayer, 10:30', read: true,
      actionLabel: 'Ver subasta', actionRoute: '/auctions',
      group: 'ayer', tab: 'ventas'
    },
  ];

  get unreadCount(): number {
    return this.notifs.filter(n => !n.read).length;
  }

  get filtered(): Notif[] {
    if (this.activeTab === 'todas') return this.notifs;
    return this.notifs.filter(n => n.tab === this.activeTab);
  }

  get showHoyLabel(): boolean {
    return this.filtered.some(n => n.group === 'hoy');
  }

  get showAyerLabel(): boolean {
    return this.filtered.some(n => n.group === 'ayer');
  }

  todayGroup(): Notif[] {
    return this.filtered.filter(n => n.group === 'hoy');
  }

  yesterdayGroup(): Notif[] {
    return this.filtered.filter(n => n.group === 'ayer');
  }

  markAllRead(): void {
    this.notifs.forEach(n => (n.read = true));
  }

  markRead(n: Notif): void {
    n.read = true;
  }
}
