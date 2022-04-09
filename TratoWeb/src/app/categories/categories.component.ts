import { Component, OnInit } from '@angular/core';
import { categorie } from '../categorie/categorie.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: categorie[] = [
    {
      id:'1',
      image: 'assets/images/categories/camiseta_jurasic.png',
      image2: 'assets/images/categories/camiseta.png',
      title: 'Moda',
      description: 'bla bla bla bla bla'
    },
    {
      id:'2',
      image: 'assets/images/categories/camioneta.png',
      image2: 'assets/images/categories/camiseta.png',
      title: 'Vehiculos',
      description: 'bla bla bla bla bla'
    },
    {
      id:'2',
      image: 'assets/images/categories/camioneta.png',
      image2: 'assets/images/categories/camiseta.png',
      title: 'Vehiculos',
      description: 'bla bla bla bla bla'
    },
    {
      id:'2',
      image: 'assets/images/categories/camioneta.png',
      image2: 'assets/images/categories/camiseta.png',
      title: 'Vehiculos',
      description: 'bla bla bla bla bla'
    },
    {
      id:'2',
      image: 'assets/images/categories/camioneta.png',
      image2: 'assets/images/categories/camiseta.png',
      title: 'Vehiculos',
      description: 'bla bla bla bla bla'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
