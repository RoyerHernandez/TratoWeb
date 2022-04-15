import { Component, OnInit } from '@angular/core';
import { auctions } from '../auctions/auctions.model';
import {ActivatedRoute, Params} from '@angular/router';
import { product } from '../product/product.model';

import {ProductsService} from '../services/products.service';


@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

  Products!: product[];
  Product!: product ;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService) { }

  auction: auctions[] = [
  {
    id: '1',
    product_name: 'stickers1',
    bidValue: 3000,
    image: 'assets/images/stickers1.png',   
    startValue: '01:00', 
    bidState: 'assets/images/logo/subtract.png',
    description: 'Espacio para foto'
  },{
    id: '2',
    product_name: 'pin',
    bidValue: 5000,
    image: 'assets/images/pin.png',    
    startValue: '03:00', 
    bidState: 'assets/images/logo/subtract.png',
    description: 'Espacio para foto'
  },{
    id: '3',
    product_name: 'stickers2',
    bidValue: 20000,
    image: 'assets/images/stickers2.png',    
    startValue: '00:00', 
    bidState: 'assets/images/logo/subtract.png',
    description: 'Espacio para foto'
  },{
    id: '4',
    product_name: 'hoodie',
    bidValue: 12000,
    image: 'assets/images/hoodie.png',    
    startValue: '05:00', 
    bidState: 'assets/images/logo/subtract.png',
    description: 'Espacio para foto'
  },{
    id: '5',
    product_name: 'camiseta',
    bidValue: 23443,
    image: 'assets/images/camiseta.png',    
    startValue: '10:00', 
    bidState: 'assets/images/logo/subtract.png',
    description: 'Espacio para foto'
  },{
    id: '6',
    product_name: 'mug',
    bidValue: 23423,
    image: 'assets/images/mug.png',    
    startValue: '00:00', 
    bidState: 'assets/images/logo/subtract.png',
    description: 'Espacio para foto'
  }
  ];



  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = '1';
      this.Product = this.productsService.getProduct(id)!;
    });
  }
}
