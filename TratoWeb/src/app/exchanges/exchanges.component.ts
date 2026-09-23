import { Component, OnInit } from '@angular/core';
import { ExchangesService } from '../core/services/exchanges/exchanges.service'
import { exchanges } from './exchanges.model';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {

  constructor(
  private  exchangesService: ExchangesService
  ) { }

  exchange!: exchanges[]

  ngOnInit(): void {
    this.exchange = this.exchangesService.getAllExchanges();
  }

}
