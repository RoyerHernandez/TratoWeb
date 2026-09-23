import { Injectable } from '@angular/core';
import { auctions } from '../../../auctions/auctions.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  constructor() { }

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
    },{
      id: '7',
      product_name: 'jurasic Park Hoodie',
      bidValue: 12000,
      image: 'assets/images/categories/jurasicParkHoodie.png',    
      startValue: '05:00', 
      bidState: 'assets/images/logo/subtract.png',
      description: 'Espacio para foto'
    },{
      id: '8',
      product_name: 'black hodie',
      bidValue: 23443,
      image: 'assets/images/categories/blackHoodi.png',    
      startValue: '10:00', 
      bidState: 'assets/images/logo/subtract.png',
      description: 'Espacio para foto'
    },{
      id: '9',
      product_name: 'camper',
      bidValue: 23423,
      image: 'assets/images/categories/camper.png',    
      startValue: '00:00', 
      bidState: 'assets/images/logo/subtract.png',
      description: 'Espacio para foto'
    }
    ];

    GetAllAuctions(){
      return this.auction;
    }
  
    GetAuction(id: string){
      return this.auction.find(item => id === item.id )
    }
}
