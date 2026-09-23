function initCreate() {
  const D = window.TRATO_DATA;

  document.getElementById('app-content').innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Crear publicación</h1>
    </div>

    <div class="create-layout">
      <div class="create-form-wrap">

        <!-- Photos -->
        <div class="form-section">
          <div class="form-section-title">Fotos del artículo</div>
          <div class="photo-drop" id="photoDrop" onclick="document.getElementById('photoInput').click()">
            <span class="material-symbols-rounded" style="font-size:40px;color:var(--text-muted)">add_photo_alternate</span>
            <div style="margin-top:8px;font-weight:600">Subir fotos</div>
            <div style="font-size:13px;color:var(--text-muted);margin-top:4px">Arrastra aquí o haz clic · Máx. 8 fotos</div>
            <input type="file" id="photoInput" multiple accept="image/*" style="display:none" onchange="_handlePhotos(this)">
          </div>
          <div class="photo-previews" id="photoPreviews"></div>
        </div>

        <!-- Basic Info -->
        <div class="form-section">
          <div class="form-section-title">Información del artículo</div>
          <div class="form-grid">
            <div class="form-group" style="grid-column:1/-1">
              <label class="form-label">Título <span class="required">*</span></label>
              <input type="text" class="form-input" id="f-title" placeholder="Ej: Esmeralda Natural 2.3ct Certificada" maxlength="80">
              <div class="form-hint" id="title-count">0/80</div>
            </div>
            <div class="form-group" style="grid-column:1/-1">
              <label class="form-label">Descripción <span class="required">*</span></label>
              <textarea class="form-input form-textarea" id="f-desc" placeholder="Describe el artículo con detalle: estado, características, historia, certificados..." rows="5" maxlength="1000"></textarea>
              <div class="form-hint" id="desc-count">0/1000</div>
            </div>
            <div class="form-group">
              <label class="form-label">Categoría <span class="required">*</span></label>
              <select class="form-input form-select" id="f-cat">
                <option value="">Seleccionar...</option>
                ${D.categories.filter(c => c.id !== 'all').map(c => `<option value="${c.id}">${c.label}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Condición <span class="required">*</span></label>
              <select class="form-input form-select" id="f-cond">
                <option value="">Seleccionar...</option>
                <option>Nuevo sin usar</option>
                <option>Como nuevo</option>
                <option>Usado - Excelente</option>
                <option>Usado - Bueno</option>
                <option>Usado - Aceptable</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ciudad <span class="required">*</span></label>
              <input type="text" class="form-input" id="f-city" placeholder="Ej: Bogotá D.C.">
            </div>
          </div>
        </div>

        <!-- Pricing -->
        <div class="form-section">
          <div class="form-section-title">Precio y subasta</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Precio inicial (COP) <span class="required">*</span></label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">$</span>
                <input type="number" class="form-input input-with-prefix" id="f-price" placeholder="500000" min="10000" step="1000">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Incremento mínimo (COP)</label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">$</span>
                <input type="number" class="form-input input-with-prefix" id="f-increment" placeholder="50000" min="1000" step="1000" value="50000">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Precio de reserva (opcional)</label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">$</span>
                <input type="number" class="form-input input-with-prefix" id="f-reserve" placeholder="Sin reserva" min="10000" step="1000">
              </div>
              <div class="form-hint">Si nadie llega a este precio, no vendes</div>
            </div>
          </div>
        </div>

        <!-- Duration -->
        <div class="form-section">
          <div class="form-section-title">Duración de la subasta</div>
          <div class="duration-grid" id="durationGrid">
            <button class="duration-btn" data-hours="6" onclick="_selectDuration(this)">
              <div class="duration-val">6h</div>
              <div class="duration-label">Rápida</div>
            </button>
            <button class="duration-btn" data-hours="24" onclick="_selectDuration(this)">
              <div class="duration-val">24h</div>
              <div class="duration-label">1 día</div>
            </button>
            <button class="duration-btn active" data-hours="72" onclick="_selectDuration(this)">
              <div class="duration-val">3d</div>
              <div class="duration-label">Recomendada</div>
            </button>
            <button class="duration-btn" data-hours="120" onclick="_selectDuration(this)">
              <div class="duration-val">5d</div>
              <div class="duration-label">Estándar</div>
            </button>
            <button class="duration-btn" data-hours="168" onclick="_selectDuration(this)">
              <div class="duration-val">7d</div>
              <div class="duration-label">Extendida</div>
            </button>
          </div>
          <div class="duration-info" id="durationInfo">
            Finaliza el <strong id="durationDate"></strong>
          </div>
        </div>

        <!-- Submit -->
        <div class="form-actions">
          <button class="btn btn-ghost" onclick="navigate('auctions')">Cancelar</button>
          <button class="btn btn-primary" onclick="_submitCreate()">
            <span class="material-symbols-rounded">gavel</span>
            Publicar subasta
          </button>
        </div>

      </div>

      <!-- Preview Panel -->
      <div class="create-preview-panel">
        <div class="preview-label">Vista previa</div>
        <div id="previewCard" class="preview-card-wrap">
          <div class="preview-placeholder">
            <span class="material-symbols-rounded" style="font-size:36px;color:var(--text-muted)">preview</span>
            <div style="margin-top:8px;color:var(--text-muted);font-size:13px">Completa los campos para ver la vista previa</div>
          </div>
        </div>
        <div class="preview-tips">
          <div class="tip-title">
            <span class="material-symbols-rounded" style="font-size:14px;color:var(--orange)">lightbulb</span>
            Consejos para vender más
          </div>
          <ul class="tip-list">
            <li>Sube mínimo 3 fotos de alta calidad</li>
            <li>Incluye fotos del estado real del artículo</li>
            <li>Menciona defectos o desgaste si los hay</li>
            <li>El precio inicial bajo atrae más pujas</li>
            <li>3 días es la duración más efectiva</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Set initial duration date
  _updateDurationDate(72);

  // Live preview & counters
  const titleInput = document.getElementById('f-title');
  const descInput = document.getElementById('f-desc');

  titleInput.addEventListener('input', () => {
    document.getElementById('title-count').textContent = `${titleInput.value.length}/80`;
    _updatePreview();
  });
  descInput.addEventListener('input', () => {
    document.getElementById('desc-count').textContent = `${descInput.value.length}/1000`;
    _updatePreview();
  });
  document.getElementById('f-price').addEventListener('input', _updatePreview);
  document.getElementById('f-cat').addEventListener('change', _updatePreview);
  document.getElementById('f-city').addEventListener('input', _updatePreview);

  // Drag & drop
  const drop = document.getElementById('photoDrop');
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag-over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
  drop.addEventListener('drop', e => {
    e.preventDefault();
    drop.classList.remove('drag-over');
    _processPhotoFiles(e.dataTransfer.files);
  });
}

let _selectedDurationHours = 72;
let _photoDataURLs = [];

function _selectDuration(btn) {
  document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  _selectedDurationHours = +btn.dataset.hours;
  _updateDurationDate(_selectedDurationHours);
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

function _handlePhotos(input) {
  _processPhotoFiles(input.files);
}

function _processPhotoFiles(files) {
  const arr = Array.from(files).slice(0, 8 - _photoDataURLs.length);
  arr.forEach(f => {
    const reader = new FileReader();
    reader.onload = e => {
      _photoDataURLs.push(e.target.result);
      _renderPhotoPreviews();
    };
    reader.readAsDataURL(f);
  });
}

function _renderPhotoPreviews() {
  const container = document.getElementById('photoPreviews');
  if (!container) return;
  container.innerHTML = _photoDataURLs.map((url, i) => `
    <div class="photo-thumb" style="background-image:url('${url}')">
      <button class="photo-remove" onclick="_removePhoto(${i})">
        <span class="material-symbols-rounded">close</span>
      </button>
    </div>
  `).join('');
}

function _removePhoto(idx) {
  _photoDataURLs.splice(idx, 1);
  _renderPhotoPreviews();
}

function _updatePreview() {
  const D = window.TRATO_DATA;
  const title = document.getElementById('f-title')?.value;
  const price = document.getElementById('f-price')?.value;
  const catId = document.getElementById('f-cat')?.value;
  const city = document.getElementById('f-city')?.value;
  const container = document.getElementById('previewCard');
  if (!container) return;

  if (!title && !price) {
    container.innerHTML = `<div class="preview-placeholder">
      <span class="material-symbols-rounded" style="font-size:36px;color:var(--text-muted)">preview</span>
      <div style="margin-top:8px;color:var(--text-muted);font-size:13px">Completa los campos para ver la vista previa</div>
    </div>`;
    return;
  }

  const catLabel = D.categories.find(c => c.id === catId)?.label || catId || '—';
  const fakeEndsAt = Date.now() + _selectedDurationHours * 3600000;
  const cd = D.countdown(fakeEndsAt);
  const imgSrc = _photoDataURLs[0] || '';

  container.innerHTML = `
    <div class="auction-card" style="cursor:default">
      <div class="auction-img" style="background:linear-gradient(135deg,#1a1060,#0d0a2e)">
        ${imgSrc
          ? `<img src="${imgSrc}" alt="" style="width:100%;height:100%;object-fit:cover">`
          : `<span style="font-size:56px">📦</span>`}
      </div>
      <div class="auction-body">
        <div class="auction-category">${catLabel}</div>
        <div class="auction-title">${title || 'Sin título'}</div>
        <div class="auction-footer">
          <div>
            <div class="auction-price-label">Precio inicial</div>
            <div class="auction-price">${price ? D.fmt(+price) : '—'}</div>
          </div>
          <div class="auction-timer ${cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : ''}">
            <span class="material-symbols-rounded" style="font-size:13px">timer</span>
            <span>${cd.str}</span>
          </div>
        </div>
        <div class="auction-meta">
          <div class="auction-meta-item">
            <span class="material-symbols-rounded" style="font-size:14px">gavel</span>
            0 pujas
          </div>
          <div class="auction-meta-item">
            <span class="material-symbols-rounded" style="font-size:14px">location_on</span>
            ${city || '—'}
          </div>
        </div>
      </div>
    </div>`;
}

function _submitCreate() {
  const title = document.getElementById('f-title')?.value?.trim();
  const desc = document.getElementById('f-desc')?.value?.trim();
  const cat = document.getElementById('f-cat')?.value;
  const cond = document.getElementById('f-cond')?.value;
  const city = document.getElementById('f-city')?.value?.trim();
  const price = document.getElementById('f-price')?.value;

  if (!title || !desc || !cat || !cond || !city || !price) {
    showToast('Completa todos los campos requeridos', 'error');
    return;
  }

  // Simulate publish
  const btn = document.querySelector('.form-actions .btn-primary');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-rounded spin">progress_activity</span> Publicando...';
  }

  setTimeout(() => {
    showToast('¡Subasta publicada exitosamente!', 'success');
    _photoDataURLs = [];
    navigate('auctions');
  }, 1500);
}
