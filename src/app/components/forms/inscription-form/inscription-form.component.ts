import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  inscriptionForm!: FormGroup;

  constructor (private fb: FormBuilder, private inscriptionService: InscriptionService ) {}

  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      date_naissance: ['', [Validators.required]],
      genre: ['', [Validators.required]],
    }, { validator: (g: FormGroup) => this.passwordMatchValidator(g) });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      this.inscriptionService.addUser(this.inscriptionForm.value).subscribe(
        response => {
          alert('Un mail vous a été envoyé!');
          // Vous pouvez également réinitialiser le formulaire ici si nécessaire
          this.inscriptionForm.reset();
        },
        error => {
          alert('Une erreur est survenue lors de l\'envoie du message.');
        }
      );
    }
  }
   passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }


}
