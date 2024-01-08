import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  userId: number | null = null;

  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private inscriptionService: InscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté
    this.userId = this.authService.getUserInfo()?.id;
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.passwordForm.valid && this.userId) {
      const newPassword = this.passwordForm.value.newPassword;
      this.inscriptionService.updatePassword(this.userId, newPassword).subscribe(
        response => {
          alert('Mot de passe mis à jour avec succès!');
          this.router.navigate(['/user/profil']);
        },
        error => {
          console.error('Erreur lors de la mise à jour du mot de passe', error);
        }
      );
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }
}
