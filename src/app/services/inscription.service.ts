import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/userDTO.model';
import { PostDTO } from '../models/postDTO.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  public baseUrl = 'http://localhost:9981'

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/user/${id}`);
  }

  addUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.baseUrl}/user`, user);
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
    // Modifier l'URL en fonction de votre API et de la prise en charge de la pagination
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


}
