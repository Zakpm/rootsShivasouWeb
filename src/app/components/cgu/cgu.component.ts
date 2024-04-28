import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.css']
})
export class CguComponent implements OnInit {
  pdfSrc = 'assets/pdf/CGU.pdf';
  constructor () {

  }

  ngOnInit(): void {

  }
}
