import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées
  rows: any[] = [];
  columns = [
    { prop: 'title', name: 'Titre' },
  ];
  limit = 10; // Nombre d'éléments par page
  rowCount = 0; // Nombre total de lignes
  curPage: number = 1; // Page actuelle
  pageSize: number = 10; // Nombre d'éléments par page

  constructor (private contactService: ContactService) {
    this.imageUrlBase = this.contactService.baseUrl;
  }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(
      (data) => {
        this.rows = data;
        this.rowCount = data.length; // Définir le nombre total de lignes

      },
      (error) => {
        console.error('Erreur lors du chargement des articles', error);
      }
    );
  }

  setPage(pageInfo: { offset: number }) {
    this.curPage = pageInfo.offset + 1; // Mettre à jour la page actuelle
    this.contactService.getContactsPage(pageInfo.offset * this.pageSize, this.pageSize).subscribe(
      data => {
        this.rows = data;
        // Vous devrez peut-être aussi mettre à jour rowCount ici si votre API renvoie le nombre total de lignes
      },
      error => {
        console.error('Erreur lors du chargement des contactes', error);
      }
    );
  }

  reloadData() {
    this.contactService.getAllContacts().subscribe(
      data => {
        this.rows = data;
        this.rowCount = data.length;
      },
      error => {
        console.error('Erreur lors du rechargement des données', error);
      }
    );
  }

  confirmAndDelete(categoryId: number): void {
    const confirmation = confirm('Attention ! Vous voulez vraiment supprimer ce mail ?');
    if (confirmation) {
      this.contactService.deleteContact(categoryId).subscribe({
        next: (response) => {
        this.reloadData();
      },
        error: (error) => {
          // Gérez les erreurs ici, par exemple, afficher un message d'erreur
        }
      });
    }
  }

}
