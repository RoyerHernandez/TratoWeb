import { Component, OnInit } from '@angular/core';
import { auctions } from '../auctions/auctions.model';
import {ActivatedRoute, Params} from '@angular/router';
import { product } from '../product/product.model';

import { AuctionsService } from './../core/services/auctions/auctions.service';


@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private auctionsService: AuctionsService ) { }

  Auction!: auctions[];


  ngOnInit(): void {
    this.Auction = this.auctionsService.GetAllAuctions();}
}
