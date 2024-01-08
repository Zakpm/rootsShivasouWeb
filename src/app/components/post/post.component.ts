import { Component, OnInit } from '@angular/core';
import { PostDTO } from 'src/app/models/postDTO.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: PostDTO[] = [];
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées
  paginatedPosts: PostDTO[] = []; // Posts pour la page actuelle
  currentPage: number = 1;
  pageSize: number = 9; // Nombre de posts par page
  totalPosts: number = 0;
  totalPageCount: number = 0;



  constructor(private dataService: DataService) {
    this.imageUrlBase = this.dataService.baseUrl;
  }

  ngOnInit(): void {
    this.dataService.getAllPosts().subscribe(data => { // Stockez les données récupérées dans la propriété 'posts'
      this.posts = data
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      this.totalPosts = data.length;
      this.paginatePosts();
      this.totalPageCount = Math.ceil(this.totalPosts / this.pageSize);
    }, error => {
      console.error('Erreur lors de la récupération des posts:', error);
    });
  }

  paginatePosts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedPosts = this.posts.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.paginatePosts(); // Mettre à jour les posts affichés en fonction de la nouvelle page
  }


}
