import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées
  rows: any[] = [];
  columns = [
    { prop: 'title', name: 'Titre' },
  ];
  limit = 10; // Nombre d'éléments par page
  rowCount = 0; // Nombre total de lignes
  curPage: number = 1; // Page actuelle
  pageSize: number = 10; // Nombre d'éléments par page

  constructor(private categoryService: CategoryService) {
    this.imageUrlBase = this.categoryService.baseUrl;

   }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
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
    this.categoryService.getCategoriesPage(pageInfo.offset * this.pageSize, this.pageSize).subscribe(
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
    this.categoryService.getAllCategories().subscribe(
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
    const confirmation = confirm('Attention ! En supprimant cette catégorie, vous supprimerez tous les articles qui lui sont associés.');
    if (confirmation) {
      this.categoryService.deleteCategory(categoryId).subscribe({
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
