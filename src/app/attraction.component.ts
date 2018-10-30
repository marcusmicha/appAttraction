import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import swal from 'sweetalert2'

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

  addContent(){
    let content = "attraction";
    swal({
      title: 'Ajouter une ' + content,
      html:
      '<input id="swal-input2" class="swal2-input" placeholder="Nom" required>' +
      '<input id="swal-input3" class="swal2-input" placeholder="Date d\'installation" required>'+
      '<input id="swal-input4" class="swal2-input" placeholder="Prix de l\'entrée" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
            (<HTMLInputElement>document.getElementById('swal-input3')).value,
            (<HTMLInputElement>document.getElementById('swal-input4')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         let newContent = {
          nom: result.value[0],
          date_installation: result.value[1],
          prix: result.value[2]
        }
        console.log("newContent");
        console.log(newContent);
        this.apiService.post("attraction", newContent).subscribe((res) => { 
          this.apiService.getAll('attraction').subscribe(res => this.contents = res);
        });
      })
  }
}

