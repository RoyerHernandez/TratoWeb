// ── APP ROUTER & CORE ──

let _currentPage = null;
let _bidTarget = null;

function navigate(page, id) {
  // Clear simulation intervals on page change
  if (typeof _detailInterval !== 'undefined' && _detailInterval) {
    clearInterval(_detailInterval);
    _detailInterval = null;
  }
  if (typeof _bidSimInterval !== 'undefined' && _bidSimInterval) {
    clearInterval(_bidSimInterval);
    _bidSimInterval = null;
  }

  _currentPage = page;

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.remove('active');
    // Match 'exchanges' page name to the exchanges nav item
    const elPage = el.dataset.page;
    if (elPage === page) el.classList.add('active');
    // Treat exchange-detail as sub-page of exchanges
    if (page === 'exchange-detail' && elPage === 'exchanges') el.classList.add('active');
    // Treat detail/seller as sub-pages of auctions
    if (page === 'detail' && elPage === 'auctions') el.classList.add('active');
    if (page === 'seller' && elPage === 'auctions') el.classList.add('active');
  });

  // Close mobile sidebar
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('active');

  // Remove any floating FAB from previous page before routing
  // (each page that needs a FAB will create its own)
  const prevFab = document.querySelector('.fab');
  if (prevFab) prevFab.remove();

  // Scroll to top
  const content = document.getElementById('app-content');
  if (content) content.scrollTop = 0;
  document.querySelector('.main-content')?.scrollTo(0, 0);

  // Route
  switch (page) {
    case 'hub':             initHub();              break;
    case 'auctions':        initAuctions();         break;
    case 'exchanges':       initExchanges();        break;
    case 'create':          initCreate();           break;
    case 'detail':          initDetail(id);         break;
    case 'exchange-detail': initExchangeDetail(id); break;
    case 'won':             initWon();              break;
    case 'seller':          initSeller(id);         break;
    case 'onboarding':      initOnboarding();       break;
    default:                initHub();
  }
}

// ── TOAST ──
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = { success: 'check_circle', error: 'error', info: 'info' };
  toast.innerHTML = `
    <span class="material-symbols-rounded toast-icon">${icons[type] || 'info'}</span>
    <span class="toast-msg">${msg}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 3500);
}

// ── BID MODAL ──
function openBidModal(auction, amount) {
  const D = window.TRATO_DATA;
  _bidTarget = { auction, amount };

  document.getElementById('bidModalBody').innerHTML = `
    <div class="modal-bid-summary">
      <div class="modal-bid-item">
        <div class="modal-bid-item-title">${auction.title}</div>
        <div class="modal-bid-item-cat">${auction.categoryLabel} · ${auction.location.split(',')[0]}</div>
      </div>
      <div class="modal-bid-details">
        <div class="modal-bid-row">
          <span>Puja actual</span>
          <span>${D.fmt(auction.currentPrice)}</span>
        </div>
        <div class="modal-bid-row modal-bid-row-highlight">
          <span><strong>Tu puja</strong></span>
          <span><strong style="color:var(--purple)">${D.fmt(amount)}</strong></span>
        </div>
        <div class="modal-bid-row" style="color:var(--gray-400);font-size:12px">
          <span>Comisión Trato (0%)</span>
          <span>$0</span>
        </div>
      </div>
      <div class="modal-bid-notice">
        <span class="material-symbols-rounded" style="font-size:14px;color:var(--purple)">info</span>
        Al confirmar, te comprometes a pagar si ganas la subasta.
      </div>
    </div>
  `;

  document.getElementById('bidModal').style.display = 'flex';
}

function closeBidModal() {
  document.getElementById('bidModal').style.display = 'none';
  _bidTarget = null;
}

function confirmBid() {
  if (!_bidTarget) return;
  const D = window.TRATO_DATA;
  const { auction, amount } = _bidTarget;

  closeBidModal();

  // Update local data
  auction.currentPrice = amount;
  auction.totalBids++;
  auction.bids.unshift({
    user: D.user.name,
    initials: D.user.initials,
    amount,
    time: 'justo ahora',
    top: true,
  });

  showToast(`¡Puja de ${D.fmt(amount)} realizada! Eres el líder.`, 'success');

  // Re-render detail after short delay so toast is visible
  setTimeout(() => navigate('detail', auction.id), 400);
}

// ── SIDEBAR ──
function _initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileBtn = document.getElementById('mobileMenuBtn');

  // Mobile open
  mobileBtn?.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  });

  // Overlay close
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
}

// ── NAV LINKS ──
function _initNav() {
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      if (link.classList.contains('disabled')) return;
      navigate(link.dataset.page);
    });
  });
}

// ── SEARCH ──
function _initSearch() {
  const input = document.getElementById('globalSearch');
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) {
        navigate('auctions');
        // Pass search to auctions after render
        setTimeout(() => {
          const auctionSearch = document.getElementById('auctionSearch');
          if (auctionSearch) {
            auctionSearch.value = q;
            auctionSearch.dispatchEvent(new Event('input'));
          }
        }, 100);
      }
    }
  });
}

// ── MODAL CLOSE ON OVERLAY ──
function _initModal() {
  const modal = document.getElementById('bidModal');
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeBidModal();
  });
}

// ── KEYBOARD SHORTCUTS ──
function _initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBidModal();
  });
}

// ── BOOT ──
document.addEventListener('DOMContentLoaded', () => {
  _initSidebar();
  _initNav();
  _initSearch();
  _initModal();
  _initKeyboard();
  navigate('hub');
});
