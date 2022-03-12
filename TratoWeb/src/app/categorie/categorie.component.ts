import { 
  Component, 
  Input, 
  OnInit } from "@angular/core"; 
import { categorie } from './categorie.model';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  constructor() { }

  @Input()
  categorie!: categorie;

  ngOnInit(): void {
  }

}
