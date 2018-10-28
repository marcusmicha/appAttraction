import { Component } from '@angular/core';

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

  constructor(
  ) { }

  ngOnInit() {
    this.tableVisiteurs = {
      rows: ["ID", "Date", "Nombre de visiteurs sur la journée", "Recette de la journée"]
    };
  }
}
