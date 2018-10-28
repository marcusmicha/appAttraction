import { Component } from '@angular/core';
import { ApiService } from './service/api.service';


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
  contents: any[];

  constructor(
    private apiService: ApiService

  ) { }

  ngOnInit() {
    this.apiService.getAll('maintenance').subscribe(res => this.contents = res);
    this.tableMaintenance = {
      rows: ["ID", "Date de la dernière maintenance", "Date de la prochaine maintenance", "Attraction associée", "Technicien associé"]
    };
  }
}
