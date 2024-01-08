import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      object: ['', [Validators.required]],
      phone: [''],
      content: ['', [Validators.required]],

    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(
        response => {
          alert('Votre message a été envoyé avec succès!');
          // Vous pouvez également réinitialiser le formulaire ici si nécessaire
          this.contactForm.reset();
        },
        error => {
          alert('Une erreur est survenue lors de l\'envoie du message.');
        }
      );
    }
  }


}
