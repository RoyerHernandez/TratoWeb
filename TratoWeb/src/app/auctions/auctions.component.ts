import { Component, OnInit } from '@angular/core';
import { auctions } from '../auctions/auctions.model';
import { AuctionsService } from './../core/services/auctions/auctions.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

  Auction!: auctions[];
  filtered!: auctions[];
  categories: { id: string; label: string }[] = [];
  activeCategory = 'all';
  searchQuery = '';

  // Bid modal
  bidAuction: auctions | null = null;
  bidAmount = 0;
  bidSuccess = false;
  bidError = '';

  readonly MIN_INCREMENT = 50000;

  constructor(private auctionsService: AuctionsService) {}

  ngOnInit(): void {
    this.Auction = this.auctionsService.GetAllAuctions();
    this.categories = this.auctionsService.categories;
    this.filtered = [...this.Auction];
  }

  setCategory(id: string) {
    this.activeCategory = id;
    this.applyFilters();
  }

  onSearch(query: string) {
    this.searchQuery = query.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.filtered = this.Auction.filter(a => {
      const catOk = this.activeCategory === 'all' || a.category === this.activeCategory;
      const q = this.searchQuery;
      const textOk = !q ||
        a.product_name.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q);
      return catOk && textOk;
    });
  }

  // ── Bid modal ──
  openBid(auct: auctions, event: Event) {
    event.stopPropagation();
    this.bidAuction = auct;
    this.bidAmount = auct.bidValue + this.MIN_INCREMENT;
    this.bidSuccess = false;
    this.bidError = '';
  }

  closeBid() {
    this.bidAuction = null;
    this.bidSuccess = false;
    this.bidError = '';
  }

  onBidInput(value: string) {
    this.bidAmount = parseInt(value.replace(/\D/g, ''), 10) || 0;
    this.bidError = '';
  }

  confirmBid() {
    if (!this.bidAuction) return;
    const min = this.bidAuction.bidValue + this.MIN_INCREMENT;
    if (this.bidAmount < min) {
      this.bidError = `La puja mínima es ${this.formatCOP(min)}`;
      return;
    }
    // Update the auction value and bids count
    const idx = this.Auction.findIndex(a => a.id === this.bidAuction!.id);
    if (idx !== -1) {
      this.Auction[idx] = {
        ...this.Auction[idx],
        bidValue: this.bidAmount,
        totalBids: this.Auction[idx].totalBids + 1
      };
      this.applyFilters();
    }
    this.bidSuccess = true;
    setTimeout(() => this.closeBid(), 2000);
  }

  formatCOP(n: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP',
      minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(n);
  }

  get minBid(): number {
    return this.bidAuction ? this.bidAuction.bidValue + this.MIN_INCREMENT : 0;
  }
}
