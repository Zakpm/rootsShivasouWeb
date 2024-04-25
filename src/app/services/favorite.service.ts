import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentCreation } from 'src/environments/environment';
import { FavoriteDTO } from '../models/favoriteDTO.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public baseUrl = environmentCreation.apiUrl;

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les favoris
  getAllFavorites(): Observable<FavoriteDTO[]> {
    return this.http.get<FavoriteDTO[]>(this.baseUrl + '/favs');
  }

  // Méthode pour récupérer un favori par son ID
  getFavoriteById(id: number): Observable<FavoriteDTO> {
    return this.http.get<FavoriteDTO>(`${this.baseUrl}/fav/${id}`);
  }

  // Méthode pour ajouter un favori
  addFavorite(favorite: FavoriteDTO): Observable<FavoriteDTO> {
    return this.http.post<FavoriteDTO>(this.baseUrl + '/fav', favorite);
  }

  // Méthode pour supprimer un favori par son ID
  deleteFavorite(favoriteId: number, favoriteDTO: FavoriteDTO): Observable<boolean> {
    return this.http.request<boolean>('delete', `${this.baseUrl}/fav/${favoriteId}`, { body: favoriteDTO });
  }


  // Méthode pour récupérer tous les favoris d'un utilisateur par son ID
  getFavoritesByUserId(userId: number): Observable<FavoriteDTO[]> {
    return this.http.get<FavoriteDTO[]>(`${this.baseUrl}/user/fav/${userId}`);
  }
}
