import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-contenu',
  templateUrl: './creation-contenu.component.html',
  styleUrls: ['./creation-contenu.component.css']
})
export class CreationContenuComponent implements OnInit {
  pdfSrc = 'assets/pdf/digital-learning.pdf';

  constructor (private router: Router) {}

  ngOnInit(): void {

  }

  goToContentCreator(fragment: string) {
    const url = `/contentCreator/#${fragment}`;
            window.location.href = url;
  }

}
