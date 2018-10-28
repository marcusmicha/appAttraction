import { Component } from '@angular/core';

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

  constructor(
  ) { }

  ngOnInit() {
    this.tablePersonnel = {
      rows: ["ID", "Nom", "Prénom", "Âge", "Fonction", "Salaire (€)"]
    };
  }
}
