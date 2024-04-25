import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioDTO } from 'src/app/models/portfolioDTO.model';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-admin',
  templateUrl: './portfolio-admin.component.html',
  styleUrls: ['./portfolio-admin.component.css']
})
export class PortfolioAdminComponent implements OnInit {
  portfolios: any[] = [];
  imageUrlBase: string;

  constructor(private portfolioService: PortfolioService) {
    this.imageUrlBase = portfolioService.baseUrl;
  }

  ngOnInit(): void {
    this.reloadData(); // Appel de la méthode lors de l'initialisation du composant
  }

  reloadData() {
    this.portfolioService.getAllPortfolios().subscribe(
      data => {
        this.portfolios = data; // Assignez directement toutes les données à 'portfolios'
      },
      error => console.error('Erreur lors du rechargement des données', error)
    );
  }


  // Méthode pour supprimer une image d'un portfolio
  deleteImageFromPortfolio(portfolioId: number): void {
    this.portfolioService.deletePortfolio(portfolioId).subscribe(
      () => {
        // Suppression réussie, recharger les données
        this.reloadData();
      },
      error => {
        console.error('Erreur lors de la suppression du portfolio', error);
      }
    );
  }



  // Méthode pour récupérer tous les portfolios avec leurs images
  getAllPortfolios(): void {
    this.portfolioService.getAllPortfolios().subscribe(
      portfolios => {
        this.portfolios = portfolios.map(portfolio => ({
          id: portfolio.id,
          images: portfolio.image.map(imageUrl => ({
            src: imageUrl,
            alt: 'Description de l\'image' // Vous pouvez ajuster cela si nécessaire
          }))
        }));
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des portfolios', error);
      }
    );
  }

  // Méthode appelée lors du clic sur le bouton "Supprimer"
  onDeleteImage(envent: MouseEvent, portfolioId: number, image: string): void {
    if (event) {
      event.preventDefault(); // Empêcher le comportement par défaut du navigateur
    }
      if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      this.deleteImageFromPortfolio(portfolioId);
    } else {
      console.log('Suppression annulée');
    }
  }
}
