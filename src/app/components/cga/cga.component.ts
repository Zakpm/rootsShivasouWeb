import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cga',
  templateUrl: './cga.component.html',
  styleUrls: ['./cga.component.css']
})
export class CgaComponent implements OnInit {
  pdfSrc = 'assets/pdf/CGA.pdf';
  constructor (){}

  ngOnInit(): void {

  }
}
