import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import swal from 'sweetalert2';



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
  contents: any[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAll('personnel').subscribe(res => this.contents = res);
    this.tablePersonnel = {
      rows: ["ID", "Nom", "Prénom", "Âge", "Fonction", "Salaire (€)"]
    };
  }

  addContent(){
    swal({
      showCloseButton: true,
      title: 'Ajouter un employé',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nom" required>' +
      '<input id="swal-input2" class="swal2-input" placeholder="Prénom" required>' +
      '<input id="swal-input3" class="swal2-input" placeholder="Âge" required>' +
      '<input id="swal-input4" class="swal2-input" placeholder="Fonction" required>'+
      '<input id="swal-input5" class="swal2-input" placeholder="Salaire" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
            (<HTMLInputElement>document.getElementById('swal-input3')).value,
            (<HTMLInputElement>document.getElementById('swal-input4')).value,
            (<HTMLInputElement>document.getElementById('swal-input5')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         let newContent = {
          nom: result.value[0],
          prenom: result.value[1],
          age: result.value[2],
          fonction: result.value[3],
          salaire: result.value[4]
        }
        console.log("newContent");
        console.log(newContent);
        this.apiService.post("personnel", newContent)
        .subscribe((res) => { 
          this.apiService.getAll('personnel').subscribe(res => this.contents = res);
          swal(
            'Créé !!',
            'Un nouvel employé a été ajouté.',
            'success'
          )
        });
      })
  }

  updateContent(content){
    swal({
      showCloseButton: true,
      title: 'Modifier un employé',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nom" required value="'+content.nom+'">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Nom" required value="'+content.prenom+'">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Nom" required value="'+content.age+'">' +
      '<input id="swal-input4" class="swal2-input" placeholder="Date d\'installation" value="'+content.fonction+'" required>'+
      '<input id="swal-input5" class="swal2-input" placeholder="Prix de l\'entrée" value="'+content.salaire+'" required>',
       preConfirm: function() {
         return new Promise(function(resolve) {
         if (true) {
          resolve([
            (<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value,
            (<HTMLInputElement>document.getElementById('swal-input3')).value,
            (<HTMLInputElement>document.getElementById('swal-input4')).value,
            (<HTMLInputElement>document.getElementById('swal-input5')).value,
          ]);
         }
        });
       }
       }).then(result => {
         console.log(result);
         content = {
          id: content.id,
          nom: result.value[0],
          prenom: result.value[1],
          age: result.value[2],
          fonction: result.value[3],
          salaire: result.value[4]
        }
        console.log("newContent");
        console.log(content);
        this.apiService.put("personnel", content)
        .subscribe((res) => { 
          this.apiService.getAll('personnel').subscribe(res => this.contents = res);
          swal(
            'Modifié!',
            'L\'employé suivant a été modifié : ' + content.nom,
            'success'
          )
        });
      })
  }

  deleteContent(content){
    swal({
      title: 'Êtes vous sûr de vouloir supprimer l\'employé ' + content.nom + ' ?',
      text: "Vous ne serez pas en mesure de revenir en arrière !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer l\'employé',
    }).then((result) => {
      if (result.value) {
        this.apiService.delete("personnel", content.id)
        .subscribe(res => {
          this.apiService.getAll('personnel').subscribe(res => this.contents = res);
          swal(
            'Supprimée!',
            'L\'employé suivant a été supprimé : ' + content.nom,
            'success'
          )
        })
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal(
          'Action annulée',
          'L\'emploté suivant n\'a finalement pas été supprimé : ' + content.nom,
          'error'
        )
        }
    })
  }

}
