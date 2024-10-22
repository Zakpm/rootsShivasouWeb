import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/app/services/inscription.service';
import { DataService } from 'src/app/services/data.service';
import { CategoryService } from 'src/app/services/category.service';
import { ContactService } from 'src/app/services/contact.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserDTO } from 'src/app/models/userDTO.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  usersCount: number = 0;
  postsCount: number = 0;
  categoriesCount: number = 0;
  contactCount: number = 0;
  portfolioCount: number = 0;
  users: UserDTO[] = [];

  constructor (
    private userService: InscriptionService,
    private postService: DataService,
    private categoryService: CategoryService,
    private contactService: ContactService,
    private portfolioService: PortfolioService

    ) {

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users) => this.usersCount = users.length,
      (error) => console.error('Erreur lors de la récupération des utilisateurs', error)
    );

    this.postService.getAllPosts().subscribe(
      (posts) => this.postsCount = posts.length,
      (error) => console.error('Erreur lors de la récupération des articles', error)
    );

    this.categoryService.getAllCategories().subscribe(
      (category) => this.categoriesCount = category.length,
      (error) => console.error('Erreur lors de la récupération des catégories', error)

    );

    this.contactService.getAllContacts().subscribe(
      (contact) => this.contactCount = contact.length,
      (error) => console.error('Erreur lors de la récupération des contact', error)

    )

    this.portfolioService.getAllPortfolios().subscribe(
      (portfolio) => this.portfolioCount = portfolio.length,
      (error) => console.error('Erreur lors de la récupération des images', error)
    )
  }

  exportUsersToExcel(): void {
    this.userService.generateExcel();
  }

  exportContactToExcel(): void {
    this.contactService.generateExcel();
  }

}
