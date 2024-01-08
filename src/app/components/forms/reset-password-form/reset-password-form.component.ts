import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordRequestServiceService } from 'src/app/services/reset-password-request-service.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  resetForm!: FormGroup;

  constructor (private fb: FormBuilder, private resetPasswordRequest: ResetPasswordRequestServiceService) {
  }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const email = this.resetForm.get('email')?.value;
      this.resetPasswordRequest.requestPasswordReset(email).subscribe(
        response => {
          alert('Si votre email existe vous allez recevoir un message');
          this.resetForm.reset();
        },
        error => {
          console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
          alert('Une erreur est survenue lors de l\'envoie du message.');
        }
      );
    }
  }


}
