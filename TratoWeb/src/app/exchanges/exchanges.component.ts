import { Component, OnInit } from '@angular/core';
import { exchanges } from '../exchanges/exchanges.model'

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {

  constructor() { }

  exchange: exchanges[]=
  [
    {
      id: '1',
      productName: 'camiseta',
      exchangesValue: '100',
      image: 'assets/images/hoodie.png',
      startValue: '05:00',
      exchangesState: 'assets/images/logo/union.png',
      description: 'Espacio para foto'
    },
    {
      id: '2',
      productName: 'stickers1',
      exchangesValue: '100',
      image: 'assets/images/stickers1.png',
      startValue: '05:00',
      exchangesState: 'assets/images/logo/union.png',
      description: 'Espacio para foto'
    },
    {
      id: '3',
      productName: 'stickers2',
      exchangesValue: '100',
      image: 'assets/images/stickers2.png',
      startValue: '05:00',
      exchangesState: 'assets/images/logo/union.png',
      description: 'Espacio para foto'
    },
    {
      id: '4',
      productName: 'pin',
      exchangesValue: '100',
      image: 'assets/images/pin.png',
      startValue: '05:00',
      exchangesState: 'assets/images/logo/union.png',
      description: 'Espacio para foto'
    },
    {
      id: '5',
      productName: 'mug',
      exchangesValue: '100',
      image: 'assets/images/mug.png',
      startValue: '05:00',
      exchangesState: 'assets/images/logo/union.png',
      description: 'Espacio para foto'
    },
    {
      id: '6',
      productName: 'camiseta',
      exchangesValue: '100',
      image: 'assets/images/camiseta.png',
      startValue: '05:00',
      exchangesState: 'assets/images/logo/union.png',
      description: 'Espacio para foto'
    }
  ]

  ngOnInit(): void {
  }

}
