import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnChanges, 
  SimpleChanges, 
  OnInit } from "@angular/core"; 

import { product } from '../product/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnChanges, OnInit {

  constructor() {
    console.log('1. Constructor');
  }  

  ngOnChanges(changes: SimpleChanges){
    console.log('2. ngOnChange');
    console.log(changes)
  }

  ngOnInit() {
    console.log('3. ngOnInit');
  }

  @Input()
  product!: product;

  @Output() 
  productClicked: EventEmitter<any> = new EventEmitter();

  addCar() {
    console.log('añadir al carrito');
    this.productClicked.emit(this.product.id)    
  }

  
}