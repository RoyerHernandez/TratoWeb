// ── SUBASTAS PROGRAMADAS ──

const _SCHED_MOCK = [
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

const _DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
let _schedMode = 'list'; // 'list' | 'create'
let _schedType = 'recurrent'; // 'recurrent' | 'specific'
let _schedDays = [];

function initScheduled() {
  _schedMode = 'list';
  _schedDays = [];
  _renderScheduled();
}

function _renderScheduled() {
  const content = document.getElementById('app-content');

  if (_schedMode === 'create') {
    _renderScheduledCreate(content);
    return;
  }

  const listHTML = _SCHED_MOCK.map(s => {
    const isPaused = s.status === 'paused';
    const typeLabel = s.type === 'recurrent'
      ? `🔁 Recurrente · ${s.days.join(', ')} · ${s.time}`
      : `📅 Fecha específica · ${s.time}`;

    return `
      <div class="sched-item${isPaused ? ' sched-item-paused' : ''}">
        <div class="sched-item-emoji">${s.emoji}</div>
        <div class="sched-item-info">
          <div class="sched-item-title">${s.title}</div>
          <div class="sched-item-meta">${typeLabel}</div>
          <div class="sched-item-meta" style="margin-top:2px">
            <span class="sched-next-badge">⏱ Próxima: ${s.nextRun}</span>
            &nbsp;·&nbsp; ${s.duration} de duración
          </div>
        </div>
        <div class="sched-item-right">
          <div class="sched-item-price">${s.price}</div>
          <div class="sched-item-inc">Incremento ${s.increment}</div>
          <div class="sched-item-actions">
            ${isPaused
              ? `<button class="btn btn-sm btn-teal" onclick="_schedTogglePause('${s.id}')">▶ Reanudar</button>`
              : `<button class="btn btn-sm btn-ghost" onclick="_schedTogglePause('${s.id}')">⏸ Pausar</button>`}
            <button class="btn btn-sm btn-ghost" onclick="showToast('Editor de programación — próximamente', 'info')">✏️ Editar</button>
            <button class="btn btn-sm btn-ghost" style="color:var(--danger)" onclick="_schedDelete('${s.id}')">🗑</button>
          </div>
        </div>
      </div>`;
  }).join('');

  const activeCount  = _SCHED_MOCK.filter(s => s.status === 'scheduled').length;
  const pausedCount  = _SCHED_MOCK.filter(s => s.status === 'paused').length;
  const nextAuction  = _SCHED_MOCK.find(s => s.status === 'scheduled');

  content.innerHTML = `
    <div class="sched-page">

      <div class="sched-topbar">
        <div>
          <div class="sched-title">Subastas Programadas</div>
          <div class="sched-subtitle">Programa tus subastas con anticipación — sin estar pendiente todos los días</div>
        </div>
        <button class="btn btn-primary" onclick="_schedShowCreate()">
          <span class="material-symbols-rounded" style="font-size:16px">schedule_send</span>
          Nueva programación
        </button>
      </div>

      <div class="sched-summary-row">
        <div class="sched-summary-card">
          <div class="sched-summary-val">${activeCount}</div>
          <div class="sched-summary-lbl">Programadas activas</div>
        </div>
        <div class="sched-summary-card">
          <div class="sched-summary-val">${pausedCount}</div>
          <div class="sched-summary-lbl">Pausadas</div>
        </div>
        <div class="sched-summary-card">
          <div class="sched-summary-val">${nextAuction ? nextAuction.nextRun.split('·')[0].trim() : '—'}</div>
          <div class="sched-summary-lbl">Próxima publicación</div>
        </div>
        <div class="sched-summary-card sched-summary-tip">
          <span style="font-size:20px">💡</span>
          <div style="font-size:12px;color:var(--text-secondary)">Las subastas de Lun–Mié 6–9 PM reciben <strong>2.4x más pujas</strong> en joyería.</div>
        </div>
      </div>

      <div class="sched-list">
        <div class="sched-list-header">
          <div style="font-size:13px;font-weight:800;color:var(--text-primary)">Cola de publicación (${_SCHED_MOCK.length})</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Ordenadas por próxima ejecución</div>
        </div>
        ${listHTML}
      </div>

    </div>
  `;
}

function _renderScheduledCreate(content) {
  const daysHTML = _DAYS.map(d => `
    <button class="sched-day-chip${_schedDays.includes(d) ? ' sched-day-active' : ''}"
      onclick="_schedToggleDay('${d}')">${d}</button>`).join('');

  content.innerHTML = `
    <div class="sched-page">

      <div class="sched-topbar">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="btn btn-ghost btn-sm" onclick="_schedBack()">
            <span class="material-symbols-rounded" style="font-size:16px">arrow_back</span>
          </button>
          <div>
            <div class="sched-title">Nueva programación</div>
            <div class="sched-subtitle">Define cuándo y cómo se publicará esta subasta</div>
          </div>
        </div>
      </div>

      <div class="sched-create-layout">

        <!-- Tipo de programación -->
        <div class="form-section">
          <div class="form-section-title">¿Cómo quieres programarla?</div>
          <div class="sched-type-row">
            <div class="sched-type-card${_schedType === 'recurrent' ? ' sched-type-active' : ''}"
              onclick="_schedSetType('recurrent')">
              <div class="sched-type-icon">🔁</div>
              <div class="sched-type-title">Recurrente</div>
              <div class="sched-type-desc">Se publica automáticamente los días que elijas, cada semana</div>
            </div>
            <div class="sched-type-card${_schedType === 'specific' ? ' sched-type-active' : ''}"
              onclick="_schedSetType('specific')">
              <div class="sched-type-icon">📅</div>
              <div class="sched-type-title">Fecha específica</div>
              <div class="sched-type-desc">Elige un día y hora exactos para una publicación única</div>
            </div>
          </div>
        </div>

        <!-- Configuración de tiempo -->
        <div class="form-section" id="sched-time-section">
          ${_schedType === 'recurrent' ? `
            <div class="form-section-title">¿Qué días de la semana?</div>
            <div class="sched-days-row">${daysHTML}</div>
            <div style="margin-top:16px">
              <label class="form-label">Hora de publicación</label>
              <div style="display:flex;gap:10px;align-items:center;margin-top:6px">
                <select class="form-input form-select" id="sched-hour" style="width:140px">
                  ${['6:00 AM','7:00 AM','8:00 AM','12:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'].map(h =>
                    `<option${h === '7:00 PM' ? ' selected' : ''}>${h}</option>`).join('')}
                </select>
                <span style="font-size:12px;color:var(--text-tertiary)">· Hora Colombia (UTC-5)</span>
              </div>
            </div>
          ` : `
            <div class="form-section-title">¿Cuándo publicar?</div>
            <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:14px">
              <div class="form-group">
                <label class="form-label">Fecha</label>
                <input type="date" class="form-input" id="sched-date"
                  min="${new Date().toISOString().split('T')[0]}"
                  value="${new Date(Date.now() + 2*24*3600000).toISOString().split('T')[0]}">
              </div>
              <div class="form-group">
                <label class="form-label">Hora</label>
                <select class="form-input form-select" id="sched-hour">
                  ${['6:00 AM','7:00 AM','8:00 AM','12:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'].map(h =>
                    `<option${h === '7:00 PM' ? ' selected' : ''}>${h}</option>`).join('')}
                </select>
              </div>
            </div>
          `}
        </div>

        <!-- Duración de la subasta -->
        <div class="form-section">
          <div class="form-section-title">Duración de la subasta</div>
          <div class="sched-duration-row">
            ${[['1h','1 hora'],['3h','3 horas'],['6h','6 horas'],['12h','12 horas'],['24h','1 día'],['3d','3 días'],['7d','7 días']].map(([val, lbl]) =>
              `<button class="sched-dur-chip${val === '6h' ? ' sched-dur-active' : ''}"
                onclick="_schedSetDuration(this, '${val}')">${lbl}</button>`).join('')}
          </div>
          <div style="font-size:12px;color:var(--text-tertiary);margin-top:8px">
            💡 Subastas de 3–6 horas generan mayor urgencia y más pujas finales.
          </div>
        </div>

        <!-- Info del artículo -->
        <div class="form-section">
          <div class="form-section-title">Artículo a subastar</div>
          <div class="form-grid">
            <div class="form-group" style="grid-column:1/-1">
              <label class="form-label">Título <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="Ej: Esmeralda Natural 4ct Certificada" maxlength="80">
            </div>
            <div class="form-group">
              <label class="form-label">Precio inicial (COP) <span class="required">*</span></label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">$</span>
                <input type="number" class="form-input input-with-prefix" placeholder="800000" min="10000" step="1000">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Incremento mínimo</label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">$</span>
                <input type="number" class="form-input input-with-prefix" value="50000" min="1000" step="1000">
              </div>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:8px">
          <button class="btn btn-ghost" onclick="_schedBack()">Cancelar</button>
          <button class="btn btn-primary" onclick="_schedSave()">
            <span class="material-symbols-rounded" style="font-size:16px">schedule_send</span>
            Programar subasta
          </button>
        </div>

      </div>
    </div>
  `;
}

function _schedShowCreate() { _schedMode = 'create'; _schedDays = []; _renderScheduled(); }
function _schedBack()        { _schedMode = 'list';   _renderScheduled(); }

function _schedSetType(type) { _schedType = type; _renderScheduled(); }

function _schedToggleDay(day) {
  const idx = _schedDays.indexOf(day);
  if (idx === -1) _schedDays.push(day); else _schedDays.splice(idx, 1);
  // Re-render only the days row
  const wrap = document.querySelector('.sched-days-row');
  if (wrap) wrap.innerHTML = _DAYS.map(d =>
    `<button class="sched-day-chip${_schedDays.includes(d) ? ' sched-day-active' : ''}"
      onclick="_schedToggleDay('${d}')">${d}</button>`).join('');
}

function _schedSetDuration(btn, val) {
  document.querySelectorAll('.sched-dur-chip').forEach(b => b.classList.remove('sched-dur-active'));
  btn.classList.add('sched-dur-active');
}

function _schedSave() {
  if (_schedType === 'recurrent' && _schedDays.length === 0) {
    showToast('Selecciona al menos un día de la semana', 'error'); return;
  }
  const daysLabel = _schedType === 'recurrent' ? _schedDays.join(', ') : 'fecha específica';
  showToast(`✅ Subasta programada para ${daysLabel} a las 7:00 PM`, 'success');
  setTimeout(() => { _schedMode = 'list'; _renderScheduled(); }, 1200);
}

function _schedTogglePause(id) {
  const item = _SCHED_MOCK.find(s => s.id === id);
  if (!item) return;
  item.status = item.status === 'paused' ? 'scheduled' : 'paused';
  const action = item.status === 'scheduled' ? 'reanudada' : 'pausada';
  showToast(`Programación ${action}`, 'info');
  _renderScheduled();
}

function _schedDelete(id) {
  const idx = _SCHED_MOCK.findIndex(s => s.id === id);
  if (idx !== -1) { _SCHED_MOCK.splice(idx, 1); showToast('Programación eliminada', 'info'); _renderScheduled(); }
}
