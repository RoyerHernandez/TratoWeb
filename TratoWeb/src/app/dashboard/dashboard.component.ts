import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) {}

  readonly kpis = [
    { label: 'Ingresos del mes',    value: '$4.2M COP', sub: '▲ +18% vs sep',         up: true,  highlight: true },
    { label: 'Subastas activas',    value: '3',         sub: '8 completadas este mes', up: false, highlight: false },
    { label: 'Pujas recibidas hoy', value: '17',        sub: '▲ +6 más que ayer',      up: true,  highlight: false },
    { label: 'Tasa de conversión',  value: '68%',       sub: '▲ +5% vs mes anterior',  up: true,  highlight: false },
  ];

  readonly weeks = [
    { label: 'Sep 1', h: 55,  amount: '$820K',  current: false },
    { label: 'Sep 2', h: 70,  amount: '$1.05M', current: false },
    { label: 'Sep 3', h: 48,  amount: '$720K',  current: false },
    { label: 'Sep 4', h: 80,  amount: '$1.2M',  current: false },
    { label: 'Oct 1', h: 95,  amount: '$1.42M', current: true  },
    { label: 'Oct 2', h: 105, amount: '$1.58M', current: true  },
    { label: 'Oct 3', h: 88,  amount: '$1.32M', current: true  },
    { label: 'Oct 4', h: 55,  amount: '$820K',  current: true  },
  ];

  readonly activeAuctions = [
    { emoji: '💎', name: 'Esmeralda Natural 2.3ct', bids: 23, price: '$1.250.000', timer: '01:11:12', timerClass: 'hot' },
    { emoji: '💍', name: 'Anillo Esmeralda Baguette Oro 18K', bids: 14, price: '$2.550.000', timer: '05:41:12', timerClass: 'ok' },
    { emoji: '📿', name: 'Collar Perlas Tahití — Certificado', bids: 8, price: '$890.000', timer: '1d 04:20', timerClass: 'warn' },
  ];

  readonly transactions = [
    { initials: 'CM', bg: 'rgba(56,17,187,.12)', fg: 'var(--trato-purple)', name: 'Carlos Martínez', product: 'Esmeralda Natural 2.3ct — Certificada', amount: '+$1.212.500', date: 'hace 3 min', statusClass: 'escrow', statusLabel: '⏳ En escrow' },
    { initials: 'AG', bg: '#EEF8CE', fg: '#4a7c00', name: 'Ana Gutiérrez', product: 'Anillo Solitario Oro Blanco 18K', amount: '+$1.940.000', date: 'ayer · 3:22 PM', statusClass: 'done', statusLabel: '✅ Completada' },
    { initials: 'PL', bg: '#FEF9C3', fg: '#856404', name: 'Pedro López', product: 'Esmeralda Cabochón 3.2ct — Muzo', amount: '+$3.280.000', date: '2 oct · 11:05 AM', statusClass: 'done', statusLabel: '✅ Completada' },
    { initials: 'MS', bg: '#FFE8DF', fg: '#c2410c', name: 'María Suárez', product: 'Pulsera Esmeraldas y Diamantes', amount: '+$4.100.000', date: '30 sep · 6:47 PM', statusClass: 'done', statusLabel: '✅ Completada' },
  ];

  readonly topItems = [
    { rank: '🥇', gold: true,  name: 'Esmeralda Cabochón 3.2ct — Muzo',         views: '847 vistas · 34 guardados', price: '$3.28M' },
    { rank: '2',  gold: false, name: 'Anillo Esmeralda Baguette Oro 18K',         views: '612 vistas · 22 guardados', price: '$2.55M' },
    { rank: '3',  gold: false, name: 'Esmeralda Natural 2.3ct — Certificada',      views: '504 vistas · 18 guardados', price: '$1.25M' },
  ];

  readonly funnel = [
    { label: 'Visitas',     pct: 100, val: '1.963', color: 'rgba(56,17,187,.5)' },
    { label: 'Interesados', pct: 72,  val: '68%',   color: 'var(--trato-purple)' },
    { label: 'Pujaron',     pct: 42,  val: '42%',   color: '#f97316' },
    { label: 'Compraron',   pct: 28,  val: '28%',   color: '#16a34a' },
  ];

  goToAuctions() { this.router.navigate(['/auctions']); }
  goToSeller() { this.router.navigate(['/seller']); }
  goToCreate() { this.router.navigate(['/scheduled']); }
}
