import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ContactDTO } from 'src/app/models/contactDTO.model';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.css']
})
export class ContactIndexComponent implements OnInit {
  contacts: ContactDTO[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(
      (data: ContactDTO[]) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des contacts', error);
      }
    );
  }
}
