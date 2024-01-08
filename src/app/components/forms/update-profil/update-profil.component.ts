import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent implements OnInit {
  updateForm!: FormGroup;
  userInfo: any;

  constructor (
    private authService: AuthService,
    private inscriptionService: InscriptionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Initialisez le FormGroup ici avec des valeurs par défaut ou vides
      this.updateForm = this.formBuilder.group({
        first_name: [''],
        last_name: [''],
        email: ['', [Validators.email]],
        nickname: [''],
      });
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();

    if (this.userInfo && this.userInfo.id) {
      this.inscriptionService.getUserById(this.userInfo.id).subscribe(
        (userData) => {
          // Mettez à jour le FormGroup avec les données réelles
          this.updateForm.patchValue({
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            nickname: userData.nickname
          });
        },
        (error) => {
          console.error('Erreur lors du chargement des informations de l’utilisateur', error);
        }
      );
    }
  }



  onSubmit(): void {
    if (this.updateForm.valid && this.userInfo && this.userInfo.id) {
      const updatedInfo = {
        first_name: this.updateForm.value.first_name,
        last_name: this.updateForm.value.last_name,
        email: this.updateForm.value.email,
        nickname: this.updateForm.value.nickname
      };
      console.log('onSubmit - updatedInfo:', updatedInfo, 'User ID:', this.userInfo.id); // Log pour déboguer
      this.inscriptionService.updateUserProfile(this.userInfo.id, updatedInfo).subscribe({
        next: (response) => {
          this.router.navigate(['/user/profil']);
          alert('Votre profil a été mis à jour avec succès !');
        },
        error: (error) => {
          console.error('Une erreur est survenue lors de la mise à jour de votre profil', error);
        }
      });
    } else {
      console.error('Formulaire non valide ou ID utilisateur non disponible');
    }
  }




}
