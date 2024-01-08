import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-idex',
  templateUrl: './user-idex.component.html',
  styleUrls: ['./user-idex.component.css']
})
export class UserIdexComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';

  constructor (private authService: AuthService) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.firstName = userInfo.prenom
      this.lastName = userInfo.nom
    }

  }
}
