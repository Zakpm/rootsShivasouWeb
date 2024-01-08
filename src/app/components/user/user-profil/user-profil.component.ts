import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  nickname: string = '';

  constructor (
    private authService: AuthService,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo && userInfo.id) {
      this.inscriptionService.getUserById(userInfo.id).subscribe(
        (userData) => {
          this.firstName = userData.first_name; // Utilisez le champ approprié
          this.lastName = userData.last_name;   // Utilisez le champ approprié
          this.email = userData.email;
          this.nickname = userData.nickname;
        },
        (error) => {
          console.error('Erreur lors du chargement des informations de l’utilisateur', error);
        }
      );
    }
  }
}
