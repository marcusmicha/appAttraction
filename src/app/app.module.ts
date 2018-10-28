import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { AttractionComponent } from './attraction.component';
import { BatimentComponent } from './batiment.component';
import { PersonnelComponent } from './personnel.component';
import { MaintenanceComponent } from './maintenance.component';
import { VisiteursComponent } from './visiteurs.component';
import { ApiService } from './service/api.service';

// import { ApiResolver } from './resolver/api.resolver'

const appRoutes: Routes = [
  { path: '',
    component: AppComponent,
    // resolve: {
    //   allData : ApiResolver
    // }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AttractionComponent,
    BatimentComponent,
    PersonnelComponent,
    MaintenanceComponent,
    VisiteursComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    AlertModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ApiService,
    // ApiResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
