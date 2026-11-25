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
}
