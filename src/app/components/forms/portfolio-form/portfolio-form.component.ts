import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.css']
})
export class PortfolioFormComponent implements OnInit {
  @Input() portfolioId: number; // Input pour recevoir l'ID du portfolio depuis le composant parent
  photoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private portfolioService: PortfolioService) {
    this.portfolioId = 0;
    // Créer le formulaire avec les champs nécessaires
    this.photoForm = this.formBuilder.group({
      image: ['', Validators.required] // Champ image obligatoire
    });
  }

  ngOnInit(): void {
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.photoForm.valid) {
      const formData = new FormData();
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput && fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append('image', fileInput.files[i], fileInput.files[i].name);
        }
      }

      this.portfolioService.updatePortfolio(this.portfolioId, formData, null).subscribe(
        updatedPortfolio => {
          // Traitement réussi, réinitialisation du formulaire
          this.photoForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'image au portfolio', error);
        }
      );
    } else {
      // Affichez des messages d'erreur ou des validations appropriées si le formulaire n'est pas valide
      console.error('Le formulaire est invalide');
    }
  }



}
