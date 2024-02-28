import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactDTO } from '../models/contactDTO.model';
import { Observable } from 'rxjs';
import { environmentContact } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public baseUrl = environmentContact.apiUrl;

  constructor(private http: HttpClient) { }

  getAllContacts() {
    return this.http.get<ContactDTO[]>(`${this.baseUrl}/contacts`);
  }

  getContactById(id: number) {
    return this.http.get<ContactDTO>(`${this.baseUrl}/contact/${id}`);
  }

  addContact(contact: ContactDTO) {
    return this.http.post<ContactDTO>(`${this.baseUrl}/contact`, contact);
  }

  deleteContact(id: number) {
    return this.http.delete<boolean>(`${this.baseUrl}/contact/${id}`);
  }

  getContactsPage(offset: number, limit: number): Observable<ContactDTO[]> {
    // Modifier l'URL en fonction de API et de la prise en charge de la pagination
    return this.http.get<ContactDTO[]>(`${this.baseUrl}/contacts?page=${offset}&limit=${limit}`);
  }

}
