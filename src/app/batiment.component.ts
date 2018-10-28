import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

declare interface table {
  rows: any[];
}

@Component({
  selector: 'app-batiment',
  templateUrl: './batiment.component.html',
  styleUrls: ['./app.component.css']
})
export class BatimentComponent {
  tableBatiment: table;
  contents: any[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAll('batiment').subscribe(res => this.contents = res);
    this.tableBatiment = {
      rows: ["ID", "Nom", "Date d'installation"]
    };
  }
}
