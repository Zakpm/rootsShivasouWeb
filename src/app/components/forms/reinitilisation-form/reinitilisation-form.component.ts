import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-reinitilisation-form',
  templateUrl: './reinitilisation-form.component.html',
  styleUrls: ['./reinitilisation-form.component.css']
})
export class ReinitilisationFormComponent implements OnInit {
  @Input() userId: number | null = null;
  resetForm!: FormGroup;

  constructor (private fb: FormBuilder,
    private resetPasswordService: InscriptionService,
    private router: Router ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]], // Exemple de validation supplémentaire
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    console.log('Form Valid:', this.resetForm.valid, 'User ID:', this.userId);
    if (this.resetForm.valid && this.userId) {
      this.resetPasswordService.updateUser(this.userId, this.resetForm.value).subscribe(
        response => {
          alert('Mot de passe réinitialisé!');
          this.resetForm.reset();
          localStorage.removeItem('resetToken'); // Supprimer le token
          this.router.navigate(['/connexion']);
        },
        error => {
          alert('Une erreur est survenue.');
        }
      );
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }
}
