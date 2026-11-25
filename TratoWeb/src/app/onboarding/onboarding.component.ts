import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ObData {
  nombre: string;
  categoria: string;
  ciudad: string;
  bio: string;
  tagline: string;
  gradient: string;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {

  step = 1;
  obData: ObData = {
    nombre: '', categoria: 'joyeria', ciudad: '', bio: '',
    tagline: '', gradient: 'linear-gradient(135deg, #8B2FC9 0%, #3CBCB8 100%)'
  };
  verified = { cedula: false, facial: false, phone: false };
  pending  = { cedula: false, facial: false, phone: false };
  confettiPieces: { left: string; bg: string; delay: string; duration: string; size: string; br: string }[] = [];
  toastMsg = '';
  toastVisible = false;
  private toastTimer: any;

  readonly CATEGORIES = [
    { id: 'joyeria',    label: 'Joyería & Esmeraldas' },
    { id: 'relojes',    label: 'Relojes' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'calzado',    label: 'Calzado' },
    { id: 'arte',       label: 'Arte & Antigüedades' },
    { id: 'otro',       label: 'Otro' },
  ];

  readonly GRADIENTS = [
    { label: 'Violeta Trato', value: 'linear-gradient(135deg, #8B2FC9 0%, #3CBCB8 100%)' },
    { label: 'Amanecer',      value: 'linear-gradient(135deg, #FF6B35 0%, #F7C59F 100%)' },
    { label: 'Océano',        value: 'linear-gradient(135deg, #0EA5E9 0%, #22D3EE 100%)' },
    { label: 'Esmeralda',     value: 'linear-gradient(135deg, #059669 0%, #34D399 100%)' },
    { label: 'Noche',         value: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' },
    { label: 'Coral',         value: 'linear-gradient(135deg, #BE185D 0%, #F43F5E 100%)' },
  ];

  readonly VERIFY_ITEMS = [
    { key: 'cedula' as const, emoji: '🪪', title: 'Cédula de ciudadanía',
      desc: 'Sube una foto de tu cédula (frente y reverso)', action: 'Subir documento' },
    { key: 'facial' as const, emoji: '🤳', title: 'Reconocimiento facial',
      desc: 'Tómate una selfie en tiempo real para confirmar tu identidad', action: 'Iniciar reconocimiento' },
    { key: 'phone'  as const, emoji: '📱', title: 'Número de teléfono',
      desc: 'Te enviaremos un código SMS para confirmar tu número', action: 'Verificar número' },
  ];

  readonly STEPS_LABEL = ['Tu negocio', 'Verificación', 'Tu vitrina', '¡Listo!'];

  constructor(private router: Router) {}

  get stepsArr() { return [1, 2, 3, 4]; }
  get allVerified() { return this.verified.cedula && this.verified.facial && this.verified.phone; }
  get slug() {
    return (this.obData.nombre || 'tu-tienda')
      .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  get initials() {
    return (this.obData.nombre || 'TU').split(' ')
      .filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  next(nombre?: string, cat?: string, ciudad?: string, bio?: string) {
    if (this.step === 1) {
      if (!nombre?.trim()) { this.showToast('Ingresa el nombre de tu tienda'); return; }
      if (!ciudad?.trim()) { this.showToast('Ingresa tu ciudad'); return; }
      this.obData.nombre    = nombre.trim();
      this.obData.categoria = cat || 'joyeria';
      this.obData.ciudad    = ciudad.trim();
      this.obData.bio       = bio?.trim() || '';
    }
    this.step++;
    if (this.step === 4) this.launchConfetti();
  }

  back() { if (this.step > 1) this.step--; }

  verify(key: 'cedula' | 'facial' | 'phone') {
    if (this.pending[key] || this.verified[key]) return;
    this.pending[key] = true;
    const times = { cedula: 2000, facial: 2500, phone: 1500 };
    const msgs  = {
      cedula: '¡Cédula verificada!',
      facial: '¡Identidad facial confirmada!',
      phone:  '¡Teléfono verificado!'
    };
    setTimeout(() => {
      this.pending[key] = false;
      this.verified[key] = true;
      this.showToast(msgs[key]);
    }, times[key]);
  }

  pickGradient(value: string, tagline?: string) {
    if (tagline !== undefined) this.obData.tagline = tagline;
    this.obData.gradient = value;
  }

  updateTagline(value: string) { this.obData.tagline = value; }

  launchConfetti() {
    const colors = ['#f97316','#22c55e','#3b82f6','#a855f7','#ec4899','#eab308'];
    this.confettiPieces = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100 + '%',
      bg: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5 + 's',
      duration: (2 + Math.random() * 2) + 's',
      size: (6 + Math.random() * 8) + 'px',
      br: Math.random() > .5 ? '50%' : '2px',
    }));
    setTimeout(() => this.confettiPieces = [], 5000);
  }

  showToast(msg: string) {
    clearTimeout(this.toastTimer);
    this.toastMsg = msg;
    this.toastVisible = true;
    this.toastTimer = setTimeout(() => this.toastVisible = false, 2800);
  }
}
