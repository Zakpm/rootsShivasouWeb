import { Component, OnInit } from '@angular/core';
import { PostDTO } from 'src/app/models/postDTO.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  posts: PostDTO[] = [];
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées


  constructor(private dataService: DataService) {
    this.imageUrlBase = this.dataService.baseUrl;
  }

  ngOnInit(): void {
    this.dataService.getAllPosts().subscribe(data => { // Stockez les données récupérées dans la propriété 'posts'
      this.posts = data
      .filter(post => post.isPublished && post.isFeatured)
      .slice(0,3)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }, error => {
      console.error('Erreur lors de la récupération des posts:', error);
    });
  }
}
