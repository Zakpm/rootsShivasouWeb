import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reinitialisation-mdp',
  templateUrl: './reinitialisation-mdp.component.html',
  styleUrls: ['./reinitialisation-mdp.component.css']
})
export class ReinitialisationMdpComponent implements OnInit {
  userId: number | null = null;
  token: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Token:', params['token'], 'User ID:', params['id']);
      this.token = params['token'];
      this.userId = +params['id']; // Supposant que l'ID est aussi passé dans l'URL
      if (this.token) {
        localStorage.setItem('resetToken', this.token);
      } else {
        // Gérer l'absence de token
      }
    });
  }
}
