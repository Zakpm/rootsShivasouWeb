import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../models/categoryDTO.model';
import { environmentCreation } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public baseUrl = environmentCreation.apiUrl; // Remplacez ceci par l'URL de base de votre application Spring Boot

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`${this.baseUrl}/category/${id}`);
  }

  insertCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(`${this.baseUrl}/category`, category);
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/category/${id}`);
  }

  updateCategory(id: number, category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(`${this.baseUrl}/category/${id}`, category);
  }

  getCategoriesPage(offset: number, limit: number): Observable<CategoryDTO[]> {
    // Modifier l'URL en fonction de votre API et de la prise en charge de la pagination
    return this.http.get<CategoryDTO[]>(`${this.baseUrl}/categories?page=${offset}&limit=${limit}`);
  }

}
