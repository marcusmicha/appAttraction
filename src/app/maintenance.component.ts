import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import swal from 'sweetalert2';



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

  addContent(){
    swal({
      showCloseButton: true,
      title: 'Ajouter une maintenance',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Dernière maintenance" required>' +
      '<input id="swal-input2" class="swal2-input" placeholder="Prochaine maintenance" required>' +
      '<input id="swal-input3" class="swal2-input" placeholder="Attraction associée" required>' +
      '<input id="swal-input4" class="swal2-input" placeholder="Technicien associé" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
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
          date_past: result.value[0],
          date_next: result.value[1],
          id_attraction: result.value[2],
          id_personnel: result.value[3]
        }
        console.log("newContent");
        console.log(newContent);
        this.apiService.post("maintenance", newContent)
        .subscribe((res) => { 
          this.apiService.getAll('maintenance').subscribe(res => this.contents = res);
          swal(
            'Créé !!',
            'Votre nouvelle maintenance a été créée.',
            'success'
          )
        });
      })
  }

  updateContent(content){
    swal({
      showCloseButton: true,
      title: 'Modifier une maintenance',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nom" required value="'+content.date_past+'">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Nom" required value="'+content.date_next+'">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Nom" required value="'+content.id_attraction+'">' +
      '<input id="swal-input4" class="swal2-input" placeholder="Date d\'installation" value="'+content.id_personnel+'" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
            (<HTMLInputElement>document.getElementById('swal-input3')).value,
            (<HTMLInputElement>document.getElementById('swal-input4')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         content = {
          id: content.id,
          date_past: result.value[0],
          date_next: result.value[1],
          id_attraction: result.value[2],
          id_personnel: result.value[3]
        }
        console.log("newContent");
        console.log(content);
        this.apiService.put("maintenance", content)
        .subscribe((res) => { 
          this.apiService.getAll('maintenance').subscribe(res => this.contents = res);
          swal(
            'Modifiée!',
            'La maintenance pour l\'attraction suivante a été modifiée : ' + content.id_attraction,
            'success'
          )
        });
      })
  }

  deleteContent(content){
    swal({
      title: 'Êtes vous sûr de vouloir supprimer la maintenance de l\'attraction ' + content.id_attraction + ' ?',
      text: "Vous ne serez pas en mesure de revenir en arrière !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer la maintenance',
    }).then((result) => {
      if (result.value) {
        this.apiService.delete("maintenance", content.id)
        .subscribe(res => {
          this.apiService.getAll('maintenance').subscribe(res => this.contents = res);
          swal(
            'Supprimée!',
            'La maintenance de L\'attraction suivante a été supprimée : ' + content.id_attraction,
            'success'
          )
        })
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal(
          'Action annulée',
          'La maintenance suivante n\'a finalement pas été supprimée : ' + content.id,
          'error'
        )
        }
    })
  }

}
