import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/userDTO.model';
import { PostDTO } from '../models/postDTO.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { environmentCreation } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  public baseUrl = environmentCreation.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/user/${id}`);
  }

  addUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.baseUrl}/user`, user).pipe(
    catchError(error => {

      let errorMessage = 'Une erreur est survenue lors de l\'inscription.';
      if (error.status === 400) {
        errorMessage = error.error;
      }
      return throwError(errorMessage);
    })
    );
  }

  verifyAccount(token: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/verify?token=${token}`);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/user/${id}`);
  }

  updateUser(id: number, updatedUserDTO: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.baseUrl}/user/${id}`, updatedUserDTO);
  }

  addPostToUser(userId: number, post: PostDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.baseUrl}/user/${userId}/posts`, post);
  }

  removePostFromUser(userId: number, postId: number): Observable<UserDTO> {
    return this.http.delete<UserDTO>(`${this.baseUrl}/user/${userId}/posts/${postId}`);
  }

  getUsersPage(offset: number, limit: number): Observable<UserDTO[]> {
    // Modifier l'URL en fonction de API et de la prise en charge de la pagination
    return this.http.get<UserDTO[]>(`${this.baseUrl}/categories?page=${offset}&limit=${limit}`);
  }

  updateUserRoles(id: number, roles: string[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/${id}`, { roles });
  }

  updateUserProfile(id: number, updatedInfo: { first_name: string; last_name: string; email: string; }): Observable<UserDTO> {
    console.log('updateUserProfile - ID:', id, 'Info:', updatedInfo); // Log pour déboguer
    return this.http.put<UserDTO>(`${this.baseUrl}/user/${id}`, updatedInfo);
  }

  updatePassword(id: number, newPassword: string): Observable<any> {
    const payload = { password: newPassword };
    return this.http.put<any>(`${this.baseUrl}/user/${id}`, payload);
  }

  generateExcel(): void {
    this.getAllUsers().subscribe(users => {
      const dataToExport = users.map(user => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        nickname: user.nickname,
        email: user.email,
        date_naissance: user.date_naissance,
        genre: user.Genre,
        roles: user.roles.join(', '), // convert array to string
        postIds: user.postIds.join(', ') // convert array to string
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
