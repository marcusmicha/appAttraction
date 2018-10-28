import { Component } from '@angular/core';
import { ApiService } from './service/api.service';


declare interface table {
  rows: any[];
}

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./app.component.css']
})
export class PersonnelComponent {
  tablePersonnel: table;
  contents: any[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAll('personnel').subscribe(res => this.contents = res);
    this.tablePersonnel = {
      rows: ["ID", "Nom", "Prénom", "Âge", "Fonction", "Salaire (€)"]
    };
  }
}
