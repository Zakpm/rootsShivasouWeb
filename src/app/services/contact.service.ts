import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactDTO } from '../models/contactDTO.model';
import { Observable } from 'rxjs';
import { environmentContact } from '../../environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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

  generateExcel(): void {
    this.getAllContacts().subscribe(contacts => {
      const dataToExport = contacts.map(contact => ({
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        object: contact.object,
        created_at: contact.created_at

      }));
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook: XLSX.WorkBook = { Sheets: { 'Users': worksheet }, SheetNames: ['Users'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'users');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
