import { Component } from '@angular/core';

declare interface table {
  rows: any[];
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./app.component.css']
})
export class MaintenanceComponent {
  tableMaintenance: table;

  constructor(
  ) { }

  ngOnInit() {
    this.tableMaintenance = {
      rows: ["ID", "Date de la dernière maintenance", "Date de la prochaine maintenance", "Attraction associée", "Technicien associé"]
    };
  }
}
