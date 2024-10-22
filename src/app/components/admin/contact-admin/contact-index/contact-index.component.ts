import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ContactDTO } from 'src/app/models/contactDTO.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.css']
})
export class ContactIndexComponent implements OnInit {
  contact: ContactDTO | undefined;

  constructor(private contactService: ContactService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContactById(id).subscribe(
      (data: ContactDTO) => {
        this.contact = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du contact', error);
      }
    );
  }
}
