let _obStep = 1;
let _obData = {};
let _obVerified = {};
let _obPending = {};

const _OB_GRADIENTS = [
  { label: 'Violeta Trato', value: 'linear-gradient(135deg, #8B2FC9 0%, #3CBCB8 100%)' },
  { label: 'Amanecer',      value: 'linear-gradient(135deg, #FF6B35 0%, #F7C59F 100%)' },
  { label: 'Océano',        value: 'linear-gradient(135deg, #0EA5E9 0%, #22D3EE 100%)' },
  { label: 'Esmeralda',     value: 'linear-gradient(135deg, #059669 0%, #34D399 100%)' },
  { label: 'Noche',         value: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)' },
  { label: 'Coral',         value: 'linear-gradient(135deg, #BE185D 0%, #F43F5E 100%)' },
];

function initOnboarding() {
  _obStep = 1;
  _obData = { nombre: '', categoria: 'joyeria', ciudad: '', bio: '', tagline: '', gradient: _OB_GRADIENTS[0].value };
  _obVerified = { cedula: false, facial: false, phone: false };
  _obPending  = { cedula: false, facial: false, phone: false };
  _renderOb();
}

function _renderOb() {
  document.getElementById('app-content').innerHTML = `
    <button class="btn-back" onclick="navigate('hub')">
      <span class="material-symbols-rounded">arrow_back</span> Volver al inicio
    </button>
    <div class="ob-container">
      ${_obProgress()}
      ${_obCard()}
    </div>
  `;
  if (_obStep === 4) _obLaunchConfetti();
}

function _obProgress() {
  const steps = ['Tu negocio', 'Verificación', 'Tu vitrina', '¡Listo!'];
  return `
    <div class="ob-progress">
      ${steps.map((label, i) => {
        const n = i + 1;
        const done = n < _obStep;
        const active = n === _obStep;
        return `
          ${i > 0 ? `<div class="ob-step-line${done ? ' done' : ''}"></div>` : ''}
          <div class="ob-step-wrap">
            <div class="ob-step-dot${done ? ' done' : active ? ' active' : ''}">
              ${done ? '<span class="material-symbols-rounded" style="font-size:14px;line-height:1">check</span>' : n}
            </div>
            <div class="ob-step-label${active ? ' active' : done ? ' done-label' : ''}">${label}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function _obCard() {
  switch (_obStep) {
    case 1: return _obStep1();
    case 2: return _obStep2();
    case 3: return _obStep3();
    case 4: return _obStep4();
    default: return _obStep1();
  }
}

// ── STEP 1: Datos del negocio ──
function _obStep1() {
  const cats = [
    { id: 'joyeria',    label: 'Joyería & Esmeraldas' },
    { id: 'relojes',    label: 'Relojes' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'calzado',    label: 'Calzado' },
    { id: 'arte',       label: 'Arte & Antigüedades' },
    { id: 'otro',       label: 'Otro' },
  ];
  return `
    <div class="ob-card">
      <div class="ob-card-header">
        <div class="ob-card-emoji">🏪</div>
        <div class="ob-card-title">Cuéntanos sobre tu negocio</div>
        <div class="ob-card-subtitle">Esta información aparecerá en tu perfil público en Trato</div>
      </div>
      <div class="ob-form">
        <div class="ob-form-group">
          <label class="ob-label">Nombre de tu tienda *</label>
          <input class="ob-input" id="ob-nombre" type="text"
            placeholder="Ej: Maru Joyería" value="${_obData.nombre}" maxlength="50">
        </div>
        <div class="ob-form-row">
          <div class="ob-form-group">
            <label class="ob-label">Categoría principal *</label>
            <select class="ob-select" id="ob-cat">
              ${cats.map(c => `<option value="${c.id}"${_obData.categoria === c.id ? ' selected' : ''}>${c.label}</option>`).join('')}
            </select>
          </div>
          <div class="ob-form-group">
            <label class="ob-label">Ciudad *</label>
            <input class="ob-input" id="ob-ciudad" type="text"
              placeholder="Bogotá D.C." value="${_obData.ciudad}">
          </div>
        </div>
        <div class="ob-form-group">
          <label class="ob-label">Descripción de tu tienda</label>
          <textarea class="ob-textarea" id="ob-bio" rows="3" maxlength="200"
            placeholder="Cuéntale a tus compradores qué vendes y qué te hace especial..."
            oninput="document.getElementById('ob-bio-count').textContent=this.value.length+'/200'"
          >${_obData.bio}</textarea>
          <div class="ob-char-hint" id="ob-bio-count">${_obData.bio.length}/200</div>
        </div>
      </div>
      <div class="ob-nav">
        <div></div>
        <button class="btn btn-primary" onclick="_obNext()">
          Continuar <span class="material-symbols-rounded">arrow_forward</span>
        </button>
      </div>
    </div>
  `;
}

// ── STEP 2: Verificación ──
function _obStep2() {
  const items = [
    { key: 'cedula', emoji: '🪪', title: 'Cédula de ciudadanía',   desc: 'Sube una foto de tu cédula (frente y reverso)',             action: 'Subir documento' },
    { key: 'facial', emoji: '🤳', title: 'Reconocimiento facial',   desc: 'Tómate una selfie en tiempo real para confirmar tu identidad', action: 'Iniciar reconocimiento' },
    { key: 'phone',  emoji: '📱', title: 'Número de teléfono',      desc: 'Te enviaremos un código SMS para confirmar tu número',       action: 'Verificar número' },
  ];
  const allDone = _obVerified.cedula && _obVerified.facial && _obVerified.phone;
  return `
    <div class="ob-card">
      <div class="ob-card-header">
        <div class="ob-card-emoji">🛡️</div>
        <div class="ob-card-title">Verifica tu identidad</div>
        <div class="ob-card-subtitle">El sello de verificación es lo que nos diferencia de vender en Facebook — genera confianza real con tus compradores</div>
      </div>
      <div class="ob-verify-list">
        ${items.map(item => `
          <div class="ob-verify-item${_obVerified[item.key] ? ' done' : ''}" id="obv-${item.key}">
            <div class="ob-verify-left">
              <div class="ob-verify-emoji">${item.emoji}</div>
              <div>
                <div class="ob-verify-title">${item.title}</div>
                <div class="ob-verify-desc">${item.desc}</div>
              </div>
            </div>
            <div class="ob-verify-right">
              ${_obVerified[item.key]
                ? `<div class="ob-verify-check"><span class="material-symbols-rounded">check_circle</span> Verificado</div>`
                : `<button class="btn btn-ghost btn-sm" onclick="_obVerify('${item.key}')">${item.action}</button>`
              }
            </div>
          </div>
        `).join('')}
      </div>
      ${allDone ? `
        <div class="ob-verify-congrats">
          <span class="material-symbols-rounded" style="font-size:20px">verified</span>
          ¡Identidad verificada! Tu perfil tendrá el badge <strong>Vendedor Verificado</strong>
        </div>
      ` : ''}
      <div class="ob-nav">
        <button class="btn btn-ghost" onclick="_obBack()">
          <span class="material-symbols-rounded">arrow_back</span> Atrás
        </button>
        <button class="btn btn-primary${allDone ? '' : ' ob-btn-disabled'}"
          onclick="${allDone ? '_obNext()' : "showToast('Completa los 3 pasos de verificación', 'error')"}">
          Continuar <span class="material-symbols-rounded">arrow_forward</span>
        </button>
      </div>
    </div>
  `;
}

// ── STEP 3: Vitrina ──
function _obStep3() {
  const nombre = _obData.nombre || 'Tu Tienda';
  const slug = nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `
    <div class="ob-card">
      <div class="ob-card-header">
        <div class="ob-card-emoji">🎨</div>
        <div class="ob-card-title">Personaliza tu vitrina</div>
        <div class="ob-card-subtitle">Así se verá tu perfil público en Trato</div>
      </div>
      <div class="ob-split">
        <div class="ob-form-col">
          <div class="ob-form-group">
            <label class="ob-label">Eslogan de tu tienda</label>
            <input class="ob-input" id="ob-tagline" type="text"
              placeholder="Ej: Esmeraldas desde Boyacá al mundo"
              value="${_obData.tagline}" maxlength="60"
              oninput="_obUpdatePreview()">
          </div>
          <div class="ob-form-group">
            <label class="ob-label">Color de banner</label>
            <div class="ob-gradient-picker">
              ${_OB_GRADIENTS.map((g, i) => `
                <div class="ob-gradient-swatch${_obData.gradient === g.value ? ' selected' : ''}"
                  style="background:${g.value}"
                  onclick="_obPickGradient(${i})"
                  title="${g.label}">
                  ${_obData.gradient === g.value ? '<span class="material-symbols-rounded" style="font-size:16px;color:white">check</span>' : ''}
                </div>
              `).join('')}
            </div>
          </div>
          <div class="ob-compare-box">
            <div class="ob-compare-title">¿Por qué Trato y no Facebook?</div>
            <div class="ob-compare-row"><span>✅</span><span>URL propia: <strong>trato.co/${slug || 'tu-tienda'}</strong></span></div>
            <div class="ob-compare-row"><span>✅</span><span>Badge verificado visible a todos los compradores</span></div>
            <div class="ob-compare-row"><span>✅</span><span>Historial de ventas y reseñas auténticas</span></div>
            <div class="ob-compare-row"><span>✅</span><span>Comisión 0% — te quedas con todo</span></div>
          </div>
        </div>
        <div class="ob-preview-col">
          <div class="ob-preview-label">Vista previa</div>
          <div class="ob-mini-profile" id="ob-mini-preview">
            ${_obMiniProfile()}
          </div>
        </div>
      </div>
      <div class="ob-nav">
        <button class="btn btn-ghost" onclick="_obBack()">
          <span class="material-symbols-rounded">arrow_back</span> Atrás
        </button>
        <button class="btn btn-primary" onclick="_obNext()">
          Publicar perfil <span class="material-symbols-rounded">rocket_launch</span>
        </button>
      </div>
    </div>
  `;
}

function _obMiniProfile() {
  const nombre = _obData.nombre || 'Tu Tienda';
  const tagline = _obData.tagline || 'Tu eslogan aquí';
  const initials = nombre.split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'TU';
  const slug = nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `
    <div class="ob-mp-banner" style="background:${_obData.gradient}"></div>
    <div class="ob-mp-body">
      <div class="ob-mp-avatar-wrap">
        <div class="ob-mp-avatar">${initials}</div>
      </div>
      <div class="ob-mp-name">${nombre}</div>
      <div class="ob-mp-tagline">${tagline}</div>
      <div class="ob-mp-badges">
        <span class="ob-mp-badge">✅ Verificado</span>
        <span class="ob-mp-badge">🏆 Nuevo</span>
      </div>
      <div class="ob-mp-url">trato.co/${slug || 'tu-tienda'}</div>
    </div>
  `;
}

// ── STEP 4: Listo ──
function _obStep4() {
  const nombre = _obData.nombre || 'Tu Tienda';
  const initials = nombre.split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'TU';
  const slug = nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `
    <div class="ob-card ob-card-success">
      <div class="ob-confetti-wrap" id="ob-confetti"></div>
      <div class="ob-card-header" style="background:linear-gradient(135deg,rgba(39,174,96,0.08) 0%,var(--bg) 100%)">
        <div class="ob-card-emoji">🎉</div>
        <div class="ob-card-title" style="color:var(--success)">¡Tu perfil está listo!</div>
        <div class="ob-card-subtitle">Ya eres parte de Trato. Empieza a vender y gana la confianza de tus compradores.</div>
      </div>
      <div class="ob-success-profile">
        <div class="ob-mp-banner" style="background:${_obData.gradient}"></div>
        <div class="ob-mp-body" style="padding:0 20px 20px">
          <div class="ob-mp-avatar-wrap">
            <div class="ob-mp-avatar" style="width:60px;height:60px;font-size:20px">${initials}</div>
          </div>
          <div class="ob-mp-name" style="font-size:18px">${nombre}</div>
          <div class="ob-mp-badges">
            <span class="ob-mp-badge">✅ Identidad verificada</span>
            <span class="ob-mp-badge">🏆 Nuevo vendedor</span>
          </div>
          <div class="ob-mp-url">trato.co/${slug || 'tu-tienda'}</div>
        </div>
      </div>
      <div class="ob-success-actions">
        <button class="btn btn-primary btn-lg" onclick="navigate('seller','maru-joyeria')">
          <span class="material-symbols-rounded">store</span>
          Ver ejemplo de perfil
        </button>
        <button class="btn btn-teal btn-lg" onclick="navigate('create')">
          <span class="material-symbols-rounded">gavel</span>
          Crear primera subasta
        </button>
      </div>
    </div>
  `;
}

// ── ACTIONS ──
function _obNext() {
  if (_obStep === 1) {
    const nombre = document.getElementById('ob-nombre')?.value.trim();
    if (!nombre) { showToast('Ingresa el nombre de tu tienda', 'error'); return; }
    const ciudad = document.getElementById('ob-ciudad')?.value.trim();
    if (!ciudad) { showToast('Ingresa tu ciudad', 'error'); return; }
    _obData.nombre    = nombre;
    _obData.categoria = document.getElementById('ob-cat')?.value || 'joyeria';
    _obData.ciudad    = ciudad;
    _obData.bio       = document.getElementById('ob-bio')?.value.trim() || '';
  } else if (_obStep === 3) {
    _obData.tagline = document.getElementById('ob-tagline')?.value.trim() || '';
  }
  _obStep++;
  _renderOb();
}

function _obBack() {
  _obStep--;
  _renderOb();
}

function _obVerify(key) {
  if (_obPending[key] || _obVerified[key]) return;
  _obPending[key] = true;

  const el = document.getElementById(`obv-${key}`);
  const btn = el?.querySelector('.ob-verify-right button');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-rounded spin" style="font-size:16px">progress_activity</span> Verificando...';
  }

  const times = { cedula: 2000, facial: 2500, phone: 1500 };
  const msgs  = { cedula: '¡Cédula verificada!', facial: '¡Identidad facial confirmada!', phone: '¡Teléfono verificado!' };

  setTimeout(() => {
    _obPending[key] = false;
    _obVerified[key] = true;
    showToast(msgs[key], 'success');

    // Update item in place
    const itemEl = document.getElementById(`obv-${key}`);
    if (itemEl) {
      itemEl.classList.add('done');
      const right = itemEl.querySelector('.ob-verify-right');
      if (right) right.innerHTML = `<div class="ob-verify-check"><span class="material-symbols-rounded">check_circle</span> Verificado</div>`;
    }

    // All done → show congrats + enable continue
    if (_obVerified.cedula && _obVerified.facial && _obVerified.phone) {
      const nav = document.querySelector('.ob-card .ob-nav');
      if (nav && !document.querySelector('.ob-verify-congrats')) {
        const c = document.createElement('div');
        c.className = 'ob-verify-congrats';
        c.innerHTML = `<span class="material-symbols-rounded" style="font-size:20px">verified</span> ¡Identidad verificada! Tu perfil tendrá el badge <strong>Vendedor Verificado</strong>`;
        nav.before(c);
        const continueBtn = nav.querySelector('button:last-child');
        if (continueBtn) {
          continueBtn.classList.remove('ob-btn-disabled');
          continueBtn.setAttribute('onclick', '_obNext()');
        }
      }
    }
  }, times[key] || 2000);
}

function _obPickGradient(idx) {
  const taglineEl = document.getElementById('ob-tagline');
  if (taglineEl) _obData.tagline = taglineEl.value;
  _obData.gradient = _OB_GRADIENTS[idx].value;
  const container = document.querySelector('.ob-container');
  if (container) container.innerHTML = _obProgress() + _obCard();
}

function _obUpdatePreview() {
  const taglineEl = document.getElementById('ob-tagline');
  if (taglineEl) _obData.tagline = taglineEl.value;
  const preview = document.getElementById('ob-mini-preview');
  if (preview) preview.innerHTML = _obMiniProfile();
}

function _obLaunchConfetti() {
  const wrap = document.getElementById('ob-confetti');
  if (!wrap) return;
  const colors = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#eab308'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*1.5}s;animation-duration:${2+Math.random()*2}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;border-radius:${Math.random()>.5?'50%':'2px'};transform:rotate(${Math.random()*360}deg);`;
    wrap.appendChild(p);
  }
  setTimeout(() => { if (wrap) wrap.innerHTML = ''; }, 5000);
}
