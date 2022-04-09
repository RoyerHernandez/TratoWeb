import { Component, OnInit } from '@angular/core';
import { product } from '../product/product.model';

import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  Products!: product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.Products = this.productsService.getAllProducts();
  }

  clickProduct(id: number){
    console.log('product');
    console.log(id);
  }

}
