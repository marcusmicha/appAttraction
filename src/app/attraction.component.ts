import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

declare interface table {
  rows: any[];
}

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./app.component.css']
})
export class AttractionComponent {
  tableAttraction: table;
  contents: any[];


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAll('attraction').subscribe(res => this.contents = res);
    this.tableAttraction = {
      rows: ["ID", "Nom", "Date d'installation", "Prix de l'entrée (€)"]
    };
  }
}
