import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  inscriptionForm!: FormGroup;
  errorMessage: string = '';

  constructor (private fb: FormBuilder, private inscriptionService: InscriptionService ) {}

  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
      confirmPassword: ['', [Validators.required]],
      date_naissance: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      agreeTerms: ['', Validators.requiredTrue],
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
          this.errorMessage = error;
        }
      );
    }
  }
   passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) {
      return null;
    }

    const hasMinLength = password.length >= 12;
    const hasMaxLength = password.length <= 4000;
    const hasUpperCase = /[A-ZÀ-Ỳ]/.test(password);
    const hasLowerCase = /[a-zà-ÿ]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasSpecialChar = /[^a-zà-ÿA-ZÀ-Ỳ0-9]/.test(password);

    const isValidPassword = hasMinLength && hasMaxLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return isValidPassword ? null : { invalidPassword: true };
  }





}
