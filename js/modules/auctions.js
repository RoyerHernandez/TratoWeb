function initAuctions() {
  const D = window.TRATO_DATA;
  let filtered = [...D.auctions];
  let activeCategory = 'all';
  let searchQuery = '';

  document.getElementById('app-content').innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Subastas activas</h1>
      <div class="live-dot">EN VIVO</div>
    </div>

    <div class="auctions-toolbar">
      <div class="search-bar">
        <span class="material-symbols-rounded">search</span>
        <input type="text" placeholder="Buscar subastas..." id="auctionSearch">
      </div>
      <div class="category-chips" id="categoryChips">
        ${D.categories.map(c => `
          <button class="chip ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">${c.label}</button>
        `).join('')}
      </div>
    </div>

    <div class="auctions-stats">
      <span><strong>${D.auctions.length}</strong> subastas activas</span>
      <span id="filtered-count"></span>
    </div>

    <div class="auction-grid" id="auctions-grid">
      ${D.auctions.map(a => renderAuctionCard(a)).join('')}
    </div>

    <button class="fab" onclick="navigate('create')" title="Crear subasta">
      <span class="material-symbols-rounded">add</span>
    </button>
  `;

  startCardTimers();

  // Category filter
  document.getElementById('categoryChips').addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderFiltered();
  });

  // Search
  document.getElementById('auctionSearch').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderFiltered();
  });

  function renderFiltered() {
    filtered = D.auctions.filter(a => {
      const catMatch = activeCategory === 'all' || a.category === activeCategory;
      const q = searchQuery;
      const textMatch = !q ||
        a.title.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q);
      return catMatch && textMatch;
    });

    const grid = document.getElementById('auctions-grid');
    const countEl = document.getElementById('filtered-count');

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div style="font-size:48px;margin-bottom:12px">🔍</div>
          <div style="font-size:18px;font-weight:600;margin-bottom:8px">Sin resultados</div>
          <div style="color:var(--gray-400)">Intenta con otros términos o categorías</div>
        </div>`;
    } else {
      grid.innerHTML = filtered.map(a => renderAuctionCard(a)).join('');
      startCardTimers();
    }

    if (searchQuery || activeCategory !== 'all') {
      countEl.textContent = `· ${filtered.length} encontradas`;
    } else {
      countEl.textContent = '';
    }
  }
}
