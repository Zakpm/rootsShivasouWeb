import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostDTO } from '../models/postDTO.model';
import { Observable } from 'rxjs';
import { environmentCreation } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public baseUrl = environmentCreation.apiUrl;

  constructor(private http: HttpClient) {

   }

   getAllPosts() {
    return this.http.get<PostDTO[]>(`${this.baseUrl}/posts`);
  }

  getPostById(id: number) {
    return this.http.get<PostDTO>(`${this.baseUrl}/post/${id}`);
  }

  addPost(formData: FormData): Observable<PostDTO> {
    return this.http.post<PostDTO>(`${this.baseUrl}/post`, formData);
  }


  deletePost(id: number) {
    return this.http.delete<boolean>(`${this.baseUrl}/post/${id}`);
  }

  updatePost(id: number, formData: FormData): Observable<PostDTO> {
    return this.http.put<PostDTO>(`${this.baseUrl}/post/${id}`, formData);
  }

  getUserNicknameByPostId(userId: number) {
    return this.http.get<string>(`${this.baseUrl}/post/user/${userId}`);
  }

  getPostsPage(offset: number, limit: number): Observable<PostDTO[]> {
    // Modifier l'URL en fonction de  API et de la prise en charge de la pagination
    return this.http.get<PostDTO[]>(`${this.baseUrl}/posts?page=${offset}&limit=${limit}`);
  }


}
