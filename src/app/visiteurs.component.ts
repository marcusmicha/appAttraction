import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

declare interface table {
  rows: any[];
}

@Component({
  selector: 'app-visiteurs',
  templateUrl: './visiteurs.component.html',
  styleUrls: ['./app.component.css']
})
export class VisiteursComponent {
  tableVisiteurs: table;
  contents: any [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAll('visiteurs').subscribe(res => this.contents = res);
    this.tableVisiteurs = {
      rows: ["ID", "Date", "Nombre de visiteurs sur la journée", "Recette de la journée"]
    };
  }
}
