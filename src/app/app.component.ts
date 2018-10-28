import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface table {
  rows: any[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appAttraction';
  allData: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.allData = this.route.snapshot.data['allData'];
    console.log(this.route.snapshot.data['allData']);
  }
}
