import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées
  rows: any[] = [];
  columns = [
    { prop: 'first_name', name: 'Prénom' },
    { prop: 'last_name', name: 'Nom' },
    { prop: 'email', name: 'email' },
    { prop: 'roles', name: 'roles' },
  ];
  limit = 10; // Nombre d'éléments par page
  rowCount = 0; // Nombre total de lignes
  curPage: number = 1; // Page actuelle
  pageSize: number = 10; // Nombre d'éléments par page

  constructor (private userService: InscriptionService) {
    this.imageUrlBase = this.userService.baseUrl;
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log('Données reçues:', data); // Ajoutez cette ligne
        this.rows = data;
        this.rowCount = data.length;
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );
  }

  setPage(pageInfo: { offset: number }) {
    this.curPage = pageInfo.offset + 1; // Mettre à jour la page actuelle
    this.userService.getUsersPage(pageInfo.offset * this.pageSize, this.pageSize).subscribe(
      data => {
        this.rows = data;
        // Vous devrez peut-être aussi mettre à jour rowCount ici si votre API renvoie le nombre total de lignes
      },
      error => {
        console.error('Erreur lors du chargement des articles', error);
      }
    );
  }

  reloadData() {
    this.userService.getAllUsers().subscribe(
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
    const confirmation = confirm('Attention ! Vous allez supprimer l\'utilisateur.');
    if (confirmation) {
      this.userService.deleteUser(categoryId).subscribe({
        next: (response) => {
        this.reloadData();
      },
        error: (error) => {
          // Gérez les erreurs ici, par exemple, afficher un message d'erreur
        }
      });
    }
  }

  transformRole(role: string): string {
    if (role === 'ROLE_USER') return 'User';
    if (role === 'ROLE_ADMIN') return 'Admin';
    if (role === 'ROLE_SUPER_ADMIN') return 'Super Admin';
    return role; // retourne le rôle tel quel si aucun des cas ci-dessus ne correspond
  }

  hasSuperAdminRole(row: any): boolean {
    return row.roles.includes('ROLE_SUPER_ADMIN');
  }


}
