import { Component } from '@angular/core';

export interface ScheduledItem {
  id: string;
  emoji: string;
  title: string;
  category: string;
  price: string;
  increment: string;
  type: 'recurrent' | 'specific';
  days: string[];
  time: string;
  duration: string;
  status: 'scheduled' | 'paused';
  nextRun: string;
}

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.scss']
})
export class ScheduledComponent {

  schedMode: 'list' | 'create' = 'list';
  schedType: 'recurrent' | 'specific' = 'recurrent';
  schedDays: string[] = [];
  selectedDuration = '6h';
  selectedHour = '7:00 PM';

  readonly DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  readonly HOURS = ['6:00 AM','7:00 AM','8:00 AM','12:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'];
  readonly DURATIONS = [
    { val: '1h',  label: '1 hora' },
    { val: '3h',  label: '3 horas' },
    { val: '6h',  label: '6 horas' },
    { val: '12h', label: '12 horas' },
    { val: '24h', label: '1 día' },
    { val: '3d',  label: '3 días' },
    { val: '7d',  label: '7 días' },
  ];

  items: ScheduledItem[] = [
    {
      id: 's1', emoji: '💎', title: 'Esmeralda Redonda 4ct — Muzo Certificada',
      category: 'Joyería', price: '$1.800.000', increment: '$100.000',
      type: 'recurrent', days: ['Lun', 'Jue'], time: '7:00 PM',
      duration: '4 horas', status: 'scheduled', nextRun: 'Lun 6 oct · 7:00 PM',
    },
    {
      id: 's2', emoji: '💍', title: 'Anillo Solitario Diamante Oro 18K',
      category: 'Joyería', price: '$3.200.000', increment: '$150.000',
      type: 'recurrent', days: ['Mar'], time: '8:00 PM',
      duration: '6 horas', status: 'scheduled', nextRun: 'Mar 7 oct · 8:00 PM',
    },
    {
      id: 's3', emoji: '📿', title: 'Brazalete Esmeraldas Cabochón — 7 piedras',
      category: 'Joyería', price: '$2.500.000', increment: '$100.000',
      type: 'specific', days: [], time: '6:00 PM',
      duration: '24 horas', status: 'scheduled', nextRun: 'Vie 10 oct · 6:00 PM',
    },
    {
      id: 's4', emoji: '🫧', title: 'Collar Perlas de Tahití — 45cm Certificado',
      category: 'Joyería', price: '$4.100.000', increment: '$200.000',
      type: 'specific', days: [], time: '3:00 PM',
      duration: '48 horas', status: 'paused', nextRun: 'Dom 12 oct · 3:00 PM',
    },
  ];

  get activeCount()  { return this.items.filter(s => s.status === 'scheduled').length; }
  get pausedCount()  { return this.items.filter(s => s.status === 'paused').length; }
  get nextAuction()  { return this.items.find(s => s.status === 'scheduled'); }

  typeLabel(item: ScheduledItem): string {
    return item.type === 'recurrent'
      ? `🔁 Recurrente · ${item.days.join(', ')} · ${item.time}`
      : `📅 Fecha específica · ${item.time}`;
  }

  showCreate() {
    this.schedMode = 'create';
    this.schedType = 'recurrent';
    this.schedDays = [];
    this.selectedDuration = '6h';
    this.selectedHour = '7:00 PM';
  }

  back() { this.schedMode = 'list'; }

  setType(type: 'recurrent' | 'specific') {
    this.schedType = type;
    this.schedDays = [];
  }

  toggleDay(day: string) {
    const idx = this.schedDays.indexOf(day);
    if (idx === -1) this.schedDays.push(day);
    else this.schedDays.splice(idx, 1);
  }

  togglePause(id: string) {
    const item = this.items.find(s => s.id === id);
    if (!item) return;
    item.status = item.status === 'paused' ? 'scheduled' : 'paused';
  }

  deleteItem(id: string) {
    this.items = this.items.filter(s => s.id !== id);
  }

  save() {
    if (this.schedType === 'recurrent' && this.schedDays.length === 0) return;
    // Add new item to the list
    const daysLabel = this.schedType === 'recurrent' ? this.schedDays.join(', ') : 'fecha específica';
    const newItem: ScheduledItem = {
      id: 's' + Date.now(),
      emoji: '🏷️',
      title: 'Nueva subasta programada',
      category: 'General',
      price: '$0',
      increment: '$50.000',
      type: this.schedType,
      days: [...this.schedDays],
      time: this.selectedHour,
      duration: this.DURATIONS.find(d => d.val === this.selectedDuration)?.label || '6 horas',
      status: 'scheduled',
      nextRun: `${daysLabel} · ${this.selectedHour}`,
    };
    this.items.push(newItem);
    this.schedMode = 'list';
  }

  get todayMin(): string {
    return new Date().toISOString().split('T')[0];
  }

  get defaultDate(): string {
    return new Date(Date.now() + 2 * 24 * 3600000).toISOString().split('T')[0];
  }
}
