import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentCreation } from 'src/environments/environment';
import { PortfolioDTO } from '../models/portfolioDTO.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public baseUrl = environmentCreation.apiUrl;

  constructor(private http: HttpClient) { }


  // Récupérer tous les portfolios
  getAllPortfolios(): Observable<PortfolioDTO[]> {
    return this.http.get<PortfolioDTO[]>(`${this.baseUrl}/portfolios`);
  }

  // Récupérer un portfolio par son ID
  getPortfolioById(id: number): Observable<PortfolioDTO> {
    return this.http.get<PortfolioDTO>(`${this.baseUrl}/portfolio/${id}`);
  }

  // Créer un nouveau portfolio
  createPortfolio(userId: number, images: FormData): Observable<any> {
    return this.http.post<PortfolioDTO>(`${this.baseUrl}/portfolio?user_id=${userId}`, images);
  }


  // Supprimer un portfolio par son ID
  deletePortfolio(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/portfolio/${id}`);
  }

}
