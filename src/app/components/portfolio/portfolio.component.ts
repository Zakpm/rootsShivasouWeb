import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolios: any[] = [];
  imageUrlBase: string;

  constructor(private portfolioService: PortfolioService) {
    this.imageUrlBase = this.portfolioService.baseUrl;
  } // Injection du service PortfolioService

  ngOnInit(): void {
    this.getAllPortfolios(); // Appel de la méthode lors de l'initialisation du composant
  }

  getAllPortfolios(): void {
    this.portfolioService.getAllPortfolios().subscribe(
      (portfolios) => {
        this.portfolios = portfolios.map(portfolio => ({
          id: portfolio.id,
          images: portfolio.image.map(imageUrl => ({
            src: imageUrl,
            alt: 'Description de l\'image' // Vous pouvez ajuster cela si nécessaire
          }))
        }));
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }
}
