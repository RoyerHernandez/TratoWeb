// 5-step wizard state
let _wizardStep = 1;
const _TOTAL_STEPS = 5;
let _wizardPhotos = [];
let _wizardPhotoStatuses = []; // 'checking' | 'ok' | 'rejected'
let _wizardDurationHours = 72;
let _wizardData = {};

const WIZARD_STEPS = [
  { num: 1, label: 'Fotos',    icon: 'add_photo_alternate' },
  { num: 2, label: 'Producto', icon: 'inventory_2' },
  { num: 3, label: 'Subasta',  icon: 'gavel' },
  { num: 4, label: 'Entrega',  icon: 'local_shipping' },
  { num: 5, label: 'Publicar', icon: 'rocket_launch' },
];

function initCreate() {
  const D = window.TRATO_DATA;
  _wizardStep = 1;
  _wizardPhotos = [];
  _wizardPhotoStatuses = [];
  _wizardDurationHours = 72;
  _wizardData = {};
  _renderWizard(D);
}

function _renderWizard(D) {
  document.getElementById('app-content').innerHTML = `
    <div class="wizard-wrap">
      <!-- Header -->
      <div class="wizard-header">
        <button class="btn-icon" onclick="_wizardBack()">
          <span class="material-symbols-rounded">arrow_back</span>
        </button>
        <h1 class="page-title" style="margin:0">Crear subasta</h1>
        <button class="btn-icon" onclick="navigate('auctions')" title="Cancelar">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>

      <!-- Progress bar -->
      <div class="wizard-progress">
        ${WIZARD_STEPS.map(s => `
          <div class="wizard-step-item ${s.num < _wizardStep ? 'done' : s.num === _wizardStep ? 'active' : ''}">
            <div class="wizard-step-circle">
              ${s.num < _wizardStep
                ? `<span class="material-symbols-rounded" style="font-size:14px">check</span>`
                : `<span class="material-symbols-rounded" style="font-size:14px">${s.icon}</span>`}
            </div>
            <div class="wizard-step-label">${s.label}</div>
          </div>
          ${s.num < _TOTAL_STEPS ? `<div class="wizard-step-line ${s.num < _wizardStep ? 'done' : ''}"></div>` : ''}
        `).join('')}
      </div>

      <!-- Step content -->
      <div class="wizard-body" id="wizardBody">
        ${_renderStep(D)}
      </div>

      <!-- Footer nav -->
      <div class="wizard-footer">
        <button class="btn btn-ghost" onclick="_wizardBack()">
          ${_wizardStep === 1 ? 'Cancelar' : 'Atrás'}
        </button>
        <div class="wizard-step-indicator">${_wizardStep} de ${_TOTAL_STEPS}</div>
        <button class="btn btn-primary" id="wizardNextBtn" onclick="_wizardNext(window.TRATO_DATA)">
          ${_wizardStep === _TOTAL_STEPS ? '<span class="material-symbols-rounded">rocket_launch</span> Publicar' : 'Continuar <span class="material-symbols-rounded">arrow_forward</span>'}
        </button>
      </div>
    </div>
  `;

  _bindStepEvents(D);
}

function _renderStep(D) {
  switch (_wizardStep) {
    case 1: return _renderStepFotos();
    case 2: return _renderStepProducto(D);
    case 3: return _renderStepSubasta(D);
    case 4: return _renderStepEntrega();
    case 5: return _renderStepPublicar(D);
    default: return '';
  }
}

// ── Step 1: Fotos ──────────────────────────────────────────────
function _renderStepFotos() {
  return `
    <div class="step-section">
      <h2 class="step-title">Fotos del artículo</h2>
      <p class="step-desc">Agrega hasta 8 fotos de alta calidad. Evita imágenes generadas por IA.</p>

      <div class="photo-drop" id="photoDrop" onclick="document.getElementById('photoInput').click()">
        <span class="material-symbols-rounded" style="font-size:40px;color:var(--purple)">add_photo_alternate</span>
        <div class="photo-drop-label">Subir fotos</div>
        <div class="photo-drop-hint">Arrastra aquí o haz clic · Máx. 8 fotos</div>
        <input type="file" id="photoInput" multiple accept="image/*" style="display:none" onchange="_wizardHandlePhotos(this)">
      </div>

      <div class="photo-previews" id="photoPreviews">
        ${_renderPhotoGrid()}
      </div>

      <div class="photo-anti-ia-notice" id="antiIaNotice" style="display:${_wizardPhotos.length > 0 ? 'flex' : 'none'}">
        <span class="material-symbols-rounded" style="font-size:16px;color:var(--purple)">security</span>
        <span>Verificando autenticidad de las fotos...</span>
      </div>

      <div class="step-tips">
        <div class="step-tips-title"><span class="material-symbols-rounded" style="font-size:14px;color:var(--purple)">lightbulb</span> Consejos</div>
        <ul class="step-tips-list">
          <li>Sube mínimo 3 fotos de alta calidad</li>
          <li>Incluye fotos del estado real del artículo</li>
          <li>Fotografías claras y bien iluminadas venden más</li>
          <li>No uses imágenes de internet ni generadas por IA</li>
        </ul>
      </div>
    </div>
  `;
}

function _renderPhotoGrid() {
  if (_wizardPhotos.length === 0) return '';
  return _wizardPhotos.map((url, i) => {
    const status = _wizardPhotoStatuses[i] || 'checking';
    return `
      <div class="photo-thumb photo-thumb--status-${status}">
        <img src="${url}" alt="Foto ${i+1}">
        <div class="photo-thumb-status">
          ${status === 'checking'
            ? `<span class="material-symbols-rounded spin" style="font-size:16px">progress_activity</span>`
            : status === 'ok'
            ? `<span class="material-symbols-rounded" style="font-size:16px;color:#22c55e">check_circle</span>`
            : `<span class="material-symbols-rounded" style="font-size:16px;color:#ef4444">cancel</span>`}
        </div>
        <button class="photo-remove" onclick="_wizardRemovePhoto(${i})">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>
    `;
  }).join('');
}

function _wizardHandlePhotos(input) {
  const files = Array.from(input.files).slice(0, 8 - _wizardPhotos.length);
  files.forEach(f => {
    const reader = new FileReader();
    reader.onload = e => {
      _wizardPhotos.push(e.target.result);
      const idx = _wizardPhotos.length - 1;
      _wizardPhotoStatuses[idx] = 'checking';
      _updatePhotoPreviews();

      // Simulate anti-IA check
      setTimeout(() => {
        _wizardPhotoStatuses[idx] = 'ok';
        _updatePhotoPreviews();
        const notice = document.getElementById('antiIaNotice');
        const allDone = _wizardPhotoStatuses.every(s => s !== 'checking');
        if (notice && allDone) {
          notice.innerHTML = `
            <span class="material-symbols-rounded" style="font-size:16px;color:#22c55e">verified</span>
            <span>Todas las fotos verificadas como auténticas</span>
          `;
        }
      }, 1500 + Math.random() * 1000);
    };
    reader.readAsDataURL(f);
  });
}

function _updatePhotoPreviews() {
  const container = document.getElementById('photoPreviews');
  if (container) container.innerHTML = _renderPhotoGrid();
  const notice = document.getElementById('antiIaNotice');
  if (notice) notice.style.display = _wizardPhotos.length > 0 ? 'flex' : 'none';
}

function _wizardRemovePhoto(idx) {
  _wizardPhotos.splice(idx, 1);
  _wizardPhotoStatuses.splice(idx, 1);
  _updatePhotoPreviews();
}

// ── Step 2: Producto ───────────────────────────────────────────
function _renderStepProducto(D) {
  const v = _wizardData;
  return `
    <div class="step-section">
      <h2 class="step-title">Información del artículo</h2>
      <div class="form-grid">
        <div class="form-group" style="grid-column:1/-1">
          <label class="form-label">Título <span class="required">*</span></label>
          <input type="text" class="form-input" id="w-title"
            placeholder="Ej: Esmeralda Natural 2.3ct Certificada GIA"
            maxlength="80" value="${v.title || ''}">
          <div class="form-hint" id="title-count">${(v.title||'').length}/80</div>
        </div>
        <div class="form-group" style="grid-column:1/-1">
          <label class="form-label">Descripción <span class="required">*</span></label>
          <textarea class="form-input form-textarea" id="w-desc"
            placeholder="Describe el artículo: estado, características, historia, certificados..."
            rows="5" maxlength="1000">${v.desc || ''}</textarea>
          <div class="form-hint" id="desc-count">${(v.desc||'').length}/1000</div>
        </div>
        <div class="form-group">
          <label class="form-label">Categoría <span class="required">*</span></label>
          <select class="form-input form-select" id="w-cat">
            <option value="">Seleccionar...</option>
            ${D.categories.filter(c => c.id !== 'all').map(c =>
              `<option value="${c.id}" ${v.cat === c.id ? 'selected' : ''}>${c.label}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Condición <span class="required">*</span></label>
          <select class="form-input form-select" id="w-cond">
            <option value="">Seleccionar...</option>
            ${['Nuevo sin usar','Como nuevo','Usado - Excelente','Usado - Bueno','Usado - Aceptable'].map(c =>
              `<option ${v.cond === c ? 'selected' : ''}>${c}</option>`
            ).join('')}
          </select>
        </div>
      </div>
    </div>
  `;
}

// ── Step 3: Subasta ────────────────────────────────────────────
function _renderStepSubasta(D) {
  const v = _wizardData;
  return `
    <div class="step-section">
      <h2 class="step-title">Configurar subasta</h2>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Precio inicial (COP) <span class="required">*</span></label>
          <div class="input-prefix-wrap">
            <span class="input-prefix">$</span>
            <input type="number" class="form-input input-with-prefix" id="w-price"
              placeholder="500.000" min="10000" step="1000" value="${v.price || ''}">
          </div>
          <div class="form-hint">Un precio inicial bajo atrae más pujas</div>
        </div>
        <div class="form-group">
          <label class="form-label">Incremento mínimo (COP)</label>
          <div class="input-prefix-wrap">
            <span class="input-prefix">$</span>
            <input type="number" class="form-input input-with-prefix" id="w-increment"
              placeholder="50.000" min="1000" step="1000" value="${v.increment || 50000}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Precio de reserva (opcional)</label>
          <div class="input-prefix-wrap">
            <span class="input-prefix">$</span>
            <input type="number" class="form-input input-with-prefix" id="w-reserve"
              placeholder="Sin reserva" min="10000" step="1000" value="${v.reserve || ''}">
          </div>
          <div class="form-hint">Si nadie llega a este precio, no vendes</div>
        </div>
        <div class="form-group">
          <label class="form-label">Comprar ahora (opcional)</label>
          <div class="input-prefix-wrap">
            <span class="input-prefix">$</span>
            <input type="number" class="form-input input-with-prefix" id="w-buynow"
              placeholder="Precio fijo" min="10000" step="1000" value="${v.buyNow || ''}">
          </div>
          <div class="form-hint">Permite compra inmediata sin esperar el cierre</div>
        </div>
      </div>

      <div class="form-group" style="margin-top:4px">
        <label class="form-label">Duración de la subasta <span class="required">*</span></label>
        <div class="duration-grid" id="durationGrid">
          ${[
            { hours: 6,   val: '6h',  label: 'Express' },
            { hours: 24,  val: '1d',  label: '1 día' },
            { hours: 72,  val: '3d',  label: 'Recomendada' },
            { hours: 120, val: '5d',  label: 'Estándar' },
            { hours: 168, val: '7d',  label: 'Extendida' },
          ].map(d => `
            <button class="duration-btn ${_wizardDurationHours === d.hours ? 'active' : ''}"
              data-hours="${d.hours}" onclick="_wizardSelectDuration(this)">
              <div class="duration-val">${d.val}</div>
              <div class="duration-label">${d.label}</div>
            </button>
          `).join('')}
        </div>
        <div class="duration-info">
          Finaliza el <strong id="durationDate"></strong>
        </div>
      </div>
    </div>
  `;
}

function _wizardSelectDuration(btn) {
  document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  _wizardDurationHours = +btn.dataset.hours;
  _updateDurationDate(_wizardDurationHours);
}

function _updateDurationDate(hours) {
  const end = new Date(Date.now() + hours * 3600000);
  const el = document.getElementById('durationDate');
  if (el) {
    el.textContent = end.toLocaleDateString('es-CO', {
      weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
    });
  }
}

// ── Step 4: Entrega ────────────────────────────────────────────
function _renderStepEntrega() {
  const v = _wizardData;
  return `
    <div class="step-section">
      <h2 class="step-title">Entrega y envío</h2>

      <div class="form-group">
        <label class="form-label">Ciudad <span class="required">*</span></label>
        <input type="text" class="form-input" id="w-city"
          placeholder="Ej: Bogotá D.C." value="${v.city || ''}">
      </div>

      <div class="form-group">
        <label class="form-label">Método de entrega <span class="required">*</span></label>
        <div class="delivery-options">
          <label class="delivery-option ${v.delivery === 'shipping' ? 'selected' : ''}" id="delOpt-shipping" onclick="_selectDelivery('shipping')">
            <input type="radio" name="delivery" value="shipping" ${v.delivery === 'shipping' ? 'checked' : ''} style="display:none">
            <span class="material-symbols-rounded">local_shipping</span>
            <div>
              <div class="delivery-opt-title">Envío nacional</div>
              <div class="delivery-opt-desc">Envías por transportadora a todo Colombia</div>
            </div>
          </label>
          <label class="delivery-option ${v.delivery === 'personal' ? 'selected' : ''}" id="delOpt-personal" onclick="_selectDelivery('personal')">
            <input type="radio" name="delivery" value="personal" ${v.delivery === 'personal' ? 'checked' : ''} style="display:none">
            <span class="material-symbols-rounded">handshake</span>
            <div>
              <div class="delivery-opt-title">Entrega personal</div>
              <div class="delivery-opt-desc">Entrega en mano en tu ciudad</div>
            </div>
          </label>
          <label class="delivery-option ${v.delivery === 'both' ? 'selected' : ''}" id="delOpt-both" onclick="_selectDelivery('both')">
            <input type="radio" name="delivery" value="both" ${v.delivery === 'both' ? 'checked' : ''} style="display:none">
            <span class="material-symbols-rounded">sync_alt</span>
            <div>
              <div class="delivery-opt-title">Ambas opciones</div>
              <div class="delivery-opt-desc">El ganador elige cómo recibir</div>
            </div>
          </label>
        </div>
      </div>

      <div class="form-group" id="shippingCostGroup" style="display:${['shipping','both'].includes(v.delivery) ? 'block' : 'none'}">
        <label class="form-label">Costo de envío (COP)</label>
        <div class="input-prefix-wrap">
          <span class="input-prefix">$</span>
          <input type="number" class="form-input input-with-prefix" id="w-shipping-cost"
            placeholder="Gratis" min="0" step="1000" value="${v.shippingCost || ''}">
        </div>
        <div class="form-hint">Deja vacío para envío gratis (atrae más pujas)</div>
      </div>

      <div class="escrow-notice">
        <span class="material-symbols-rounded" style="font-size:18px;color:var(--purple)">shield</span>
        <div>
          <div class="escrow-notice-title">Pago protegido con escrow</div>
          <div class="escrow-notice-desc">El pago queda retenido hasta confirmar entrega. El ganador paga solo si recibe.</div>
        </div>
      </div>
    </div>
  `;
}

function _selectDelivery(val) {
  _wizardData.delivery = val;
  document.querySelectorAll('.delivery-option').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById(`delOpt-${val}`);
  if (el) el.classList.add('selected');
  const costGroup = document.getElementById('shippingCostGroup');
  if (costGroup) costGroup.style.display = ['shipping','both'].includes(val) ? 'block' : 'none';
}

// ── Step 5: Publicar ───────────────────────────────────────────
function _renderStepPublicar(D) {
  const v = _wizardData;
  const end = new Date(Date.now() + _wizardDurationHours * 3600000);
  const endStr = end.toLocaleDateString('es-CO', { weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' });

  return `
    <div class="step-section">
      <h2 class="step-title">Revisar y publicar</h2>
      <p class="step-desc">Revisa los detalles antes de publicar tu subasta</p>

      <div class="publish-review">
        <!-- Photo preview -->
        <div class="review-photos">
          ${_wizardPhotos.length > 0
            ? `<img src="${_wizardPhotos[0]}" alt="Foto principal" class="review-main-photo">
               <span class="review-photo-count">${_wizardPhotos.length} foto${_wizardPhotos.length !== 1 ? 's' : ''}</span>`
            : `<div class="review-no-photo"><span class="material-symbols-rounded" style="font-size:40px;color:var(--text-tertiary)">image</span></div>`
          }
        </div>

        <!-- Review details -->
        <div class="review-details">
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">inventory_2</span> Artículo</span>
            <span class="review-val">${v.title || '—'}</span>
          </div>
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">category</span> Categoría</span>
            <span class="review-val">${D.categories.find(c => c.id === v.cat)?.label || v.cat || '—'}</span>
          </div>
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">star</span> Condición</span>
            <span class="review-val">${v.cond || '—'}</span>
          </div>
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">gavel</span> Precio inicial</span>
            <span class="review-val review-val--price">${v.price ? D.fmt(+v.price) : '—'}</span>
          </div>
          ${v.buyNow ? `
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">bolt</span> Comprar ahora</span>
            <span class="review-val">${D.fmt(+v.buyNow)}</span>
          </div>` : ''}
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">timer</span> Duración</span>
            <span class="review-val">${_wizardDurationHours < 24 ? `${_wizardDurationHours}h` : `${_wizardDurationHours/24}d`}</span>
          </div>
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">event</span> Termina</span>
            <span class="review-val">${endStr}</span>
          </div>
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">location_on</span> Ciudad</span>
            <span class="review-val">${v.city || '—'}</span>
          </div>
          <div class="review-row">
            <span class="review-key"><span class="material-symbols-rounded" style="font-size:14px">local_shipping</span> Entrega</span>
            <span class="review-val">${{ shipping:'Envío nacional', personal:'Entrega personal', both:'Envío + Personal' }[v.delivery] || '—'}</span>
          </div>
        </div>

        <div class="review-terms">
          <span class="material-symbols-rounded" style="font-size:16px;color:var(--purple)">info</span>
          <span>Al publicar aceptas los <a href="#" class="link-purple">Términos de uso</a> de Trato. Comisión: 5% del precio final de venta.</span>
        </div>
      </div>
    </div>
  `;
}

// ── Navigation ─────────────────────────────────────────────────
function _wizardBack() {
  if (_wizardStep === 1) {
    navigate('auctions');
    return;
  }
  _saveStepData();
  _wizardStep--;
  _renderWizard(window.TRATO_DATA);
}

function _wizardNext(D) {
  _saveStepData();
  if (!_validateStep()) return;

  if (_wizardStep === _TOTAL_STEPS) {
    _publishAuction(D);
    return;
  }
  _wizardStep++;
  _renderWizard(D);
}

function _saveStepData() {
  switch (_wizardStep) {
    case 2:
      _wizardData.title = document.getElementById('w-title')?.value || _wizardData.title;
      _wizardData.desc  = document.getElementById('w-desc')?.value  || _wizardData.desc;
      _wizardData.cat   = document.getElementById('w-cat')?.value   || _wizardData.cat;
      _wizardData.cond  = document.getElementById('w-cond')?.value  || _wizardData.cond;
      break;
    case 3:
      _wizardData.price     = document.getElementById('w-price')?.value     || _wizardData.price;
      _wizardData.increment = document.getElementById('w-increment')?.value || _wizardData.increment;
      _wizardData.reserve   = document.getElementById('w-reserve')?.value   || _wizardData.reserve;
      _wizardData.buyNow    = document.getElementById('w-buynow')?.value    || _wizardData.buyNow;
      break;
    case 4:
      _wizardData.city         = document.getElementById('w-city')?.value          || _wizardData.city;
      _wizardData.shippingCost = document.getElementById('w-shipping-cost')?.value || _wizardData.shippingCost;
      break;
  }
}

function _validateStep() {
  switch (_wizardStep) {
    case 1:
      if (_wizardPhotos.length === 0) {
        showToast('Agrega al menos una foto', 'error');
        return false;
      }
      if (_wizardPhotoStatuses.some(s => s === 'checking')) {
        showToast('Espera a que terminen las verificaciones', 'error');
        return false;
      }
      if (_wizardPhotoStatuses.some(s => s === 'rejected')) {
        showToast('Algunas fotos fueron rechazadas. Usa fotos auténticas', 'error');
        return false;
      }
      return true;
    case 2:
      const title = document.getElementById('w-title')?.value?.trim();
      const desc  = document.getElementById('w-desc')?.value?.trim();
      const cat   = document.getElementById('w-cat')?.value;
      const cond  = document.getElementById('w-cond')?.value;
      if (!title) { showToast('El título es requerido', 'error'); return false; }
      if (!desc)  { showToast('La descripción es requerida', 'error'); return false; }
      if (!cat)   { showToast('Selecciona una categoría', 'error'); return false; }
      if (!cond)  { showToast('Selecciona la condición', 'error'); return false; }
      return true;
    case 3:
      const price = document.getElementById('w-price')?.value;
      if (!price || +price < 10000) { showToast('Ingresa un precio inicial válido (mínimo $10.000)', 'error'); return false; }
      return true;
    case 4:
      const city = document.getElementById('w-city')?.value?.trim();
      if (!city) { showToast('Ingresa la ciudad', 'error'); return false; }
      if (!_wizardData.delivery) { showToast('Selecciona un método de entrega', 'error'); return false; }
      return true;
    case 5:
      return true;
  }
  return true;
}

function _bindStepEvents(D) {
  if (_wizardStep === 2) {
    const titleInput = document.getElementById('w-title');
    const descInput  = document.getElementById('w-desc');
    if (titleInput) titleInput.addEventListener('input', () => {
      document.getElementById('title-count').textContent = `${titleInput.value.length}/80`;
    });
    if (descInput) descInput.addEventListener('input', () => {
      document.getElementById('desc-count').textContent = `${descInput.value.length}/1000`;
    });
  }
  if (_wizardStep === 3) {
    _updateDurationDate(_wizardDurationHours);
  }

  // Re-bind photo drop
  const drop = document.getElementById('photoDrop');
  if (drop) {
    drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag-over'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
    drop.addEventListener('drop', e => {
      e.preventDefault();
      drop.classList.remove('drag-over');
      _processDroppedFiles(e.dataTransfer.files);
    });
  }
}

function _processDroppedFiles(files) {
  const arr = Array.from(files).slice(0, 8 - _wizardPhotos.length);
  arr.forEach(f => {
    const reader = new FileReader();
    reader.onload = e => {
      _wizardPhotos.push(e.target.result);
      const idx = _wizardPhotos.length - 1;
      _wizardPhotoStatuses[idx] = 'checking';
      _updatePhotoPreviews();
      setTimeout(() => {
        _wizardPhotoStatuses[idx] = 'ok';
        _updatePhotoPreviews();
      }, 1500 + Math.random() * 1000);
    };
    reader.readAsDataURL(f);
  });
}

function _publishAuction(D) {
  const btn = document.getElementById('wizardNextBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-rounded spin">progress_activity</span> Publicando...';
  }

  setTimeout(() => {
    _renderPublishSuccess(D);
  }, 1800);
}

function _renderPublishSuccess(D) {
  const v = _wizardData;
  const fakePrice = v.price ? D.fmt(+v.price) : '$500.000';

  document.getElementById('app-content').innerHTML = `
    <div class="publish-success">
      <div class="success-icon">
        <span class="material-symbols-rounded">rocket_launch</span>
      </div>
      <h1 class="success-title">¡Tu subasta está en vivo!</h1>
      <p class="success-desc">Tu artículo ya está visible para miles de compradores en Colombia</p>

      <div class="success-card" onclick="navigate('auctions')">
        <div class="success-card-img">
          ${_wizardPhotos.length > 0
            ? `<img src="${_wizardPhotos[0]}" alt="">`
            : `<span style="font-size:48px">📦</span>`}
        </div>
        <div class="success-card-body">
          <div class="success-card-title">${v.title || 'Tu subasta'}</div>
          <div class="success-card-price">Precio inicial: <strong>${fakePrice}</strong></div>
          <div class="success-card-meta">
            <span class="live-badge"><span class="live-dot"></span>En vivo</span>
            <span>${_wizardDurationHours < 24 ? `${_wizardDurationHours}h` : `${_wizardDurationHours/24}d`} restantes</span>
          </div>
        </div>
      </div>

      <div class="success-actions">
        <button class="btn btn-primary btn-lg" onclick="navigate('auctions')">
          <span class="material-symbols-rounded">gavel</span>
          Ver mi subasta
        </button>
        <button class="btn btn-ghost" onclick="showToast('Enlace copiado', \'success\')">
          <span class="material-symbols-rounded">share</span>
          Compartir
        </button>
        <button class="btn btn-ghost" onclick="navigate('hub')">
          <span class="material-symbols-rounded">home</span>
          Ir al inicio
        </button>
      </div>

      <div class="success-tips">
        <h3>Consejos para tu primera venta</h3>
        <ul>
          <li><span class="material-symbols-rounded" style="font-size:14px;color:var(--purple)">share</span> Comparte en tus grupos de Facebook y WhatsApp</li>
          <li><span class="material-symbols-rounded" style="font-size:14px;color:var(--purple)">notifications</span> Activa notificaciones para no perder pujas</li>
          <li><span class="material-symbols-rounded" style="font-size:14px;color:var(--purple)">chat_bubble</span> Responde rápido las preguntas de compradores</li>
        </ul>
      </div>
    </div>
  `;

  _wizardPhotos = [];
  _wizardPhotoStatuses = [];
  _wizardData = {};
  _wizardStep = 1;
}
