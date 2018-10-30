import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import swal from 'sweetalert2';


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
  contents: any [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAll('visiteurs').subscribe(res => this.contents = res);
    this.tableVisiteurs = {
      rows: ["ID", "Date", "Nombre de visiteurs sur la journée", "Recette de la journée"]
    };
  }

  addContent(){
    swal({
      showCloseButton: true,
      title: 'Ajouter une journée',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Date" required>' +
      '<input id="swal-input2" class="swal2-input" placeholder="Nombre de visiteurs sur la journée" required>'+
      '<input id="swal-input3" class="swal2-input" placeholder="Recette de la journée" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
            (<HTMLInputElement>document.getElementById('swal-input3')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         let newContent = {
          date: result.value[0],
          nb_visiteur: result.value[1],
          recette: result.value[2]
        }
        console.log("newContent");
        console.log(newContent);
        this.apiService.post("visiteurs", newContent)
        .subscribe((res) => { 
          this.apiService.getAll('visiteurs').subscribe(res => this.contents = res);
          swal(
            'Créée !!',
            'Votre nouvelle journée a été créée.',
            'success'
          )
        });
      })
  }

  updateContent(content){
    swal({
      showCloseButton: true,
      title: 'Modifier une journée',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nom" required value="'+content.date+'">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Date d\'installation" value="'+content.nb_visiteur+'" required>'+
      '<input id="swal-input3" class="swal2-input" placeholder="Prix de l\'entrée" value="'+content.recette+'" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
            (<HTMLInputElement>document.getElementById('swal-input3')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         content = {
          id: content.id,
          date: result.value[0],
          nb_visiteur: result.value[1],
          recette: result.value[2]
        }
        console.log("newContent");
        console.log(content);
        this.apiService.put("visiteurs", content)
        .subscribe((res) => { 
          this.apiService.getAll('visiteurs').subscribe(res => this.contents = res);
          swal(
            'Modifiée!',
            'La journée suivante a été modifiée : ' + content.date,
            'success'
          )
        });
      })
  }

  deleteContent(content){
    swal({
      title: 'Êtes vous sûr de vouloir supprimer la journée du ' + content.date + ' ?',
      text: "Vous ne serez pas en mesure de revenir en arrière !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer la journée',
    }).then((result) => {
      if (result.value) {
        this.apiService.delete("visiteurs", content.id)
        .subscribe(res => {
          this.apiService.getAll('visiteurs').subscribe(res => this.contents = res);
          swal(
            'Supprimée!',
            'La journée suivante a été supprimée : ' + content.date,
            'success'
          )
        })
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal(
          'Action annulée',
          'La journée suivante n\'a finalement pas été supprimée : ' + content.date,
          'error'
        )
        }
    })
  }

}
