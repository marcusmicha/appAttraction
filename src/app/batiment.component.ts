import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import swal from 'sweetalert2';

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

  addContent(){
    swal({
      showCloseButton: true,
      title: 'Ajouter un bâtiment',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nom" required>' +
      '<input id="swal-input2" class="swal2-input" placeholder="Date d\'installation" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         let newContent = {
          nom: result.value[0],
          date_installation: result.value[1]
        }
        console.log("newContent");
        console.log(newContent);
        this.apiService.post("batiment", newContent)
        .subscribe((res) => { 
          this.apiService.getAll('batiment').subscribe(res => this.contents = res);
          swal(
            'Créé !!',
            'Votre nouveau bâtiment a été créé.',
            'success'
          )
        });
      })
  }

  updateContent(content){
    swal({
      showCloseButton: true,
      title: 'Modifier une attraction',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nom" required value="'+content.nom+'">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Date d\'installation" value="'+content.date_installation+'" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         content = {
          id: content.id,
          nom: result.value[0],
          date_installation: result.value[1]
        }
        console.log("newContent");
        console.log(content);
        this.apiService.put("batiment", content)
        .subscribe((res) => { 
          this.apiService.getAll('batiment').subscribe(res => this.contents = res);
          swal(
            'Modifiée!',
            'Le bâtiment suivante a été modifié : ' + content.nom,
            'success'
          )
        });
      })
  }

  deleteContent(content){
    swal({
      title: 'Êtes vous sûr de vouloir supprimer le bâtiment ' + content.nom + ' ?',
      text: "Vous ne serez pas en mesure de revenir en arrière !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer le bâtiment',
    }).then((result) => {
      if (result.value) {
        this.apiService.delete("batiment", content.id)
        .subscribe(res => {
          this.apiService.getAll('batiment').subscribe(res => this.contents = res);
          swal(
            'Supprimé!',
            'Le bâtiment suivant a été supprimé : ' + content.nom,
            'success'
          )
        })
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal(
          'Action annulée',
          'Le bâtiment suivant n\'a finalement pas été supprimé : ' + content.nom,
          'error'
        )
        }
    })
  }

}
