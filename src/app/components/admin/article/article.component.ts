import { Component, OnInit} from '@angular/core';
import { PostDTO } from 'src/app/models/postDTO.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  imageUrlBase: string;
  rows: any[] = [];

  constructor(private dataService: DataService) {
    this.imageUrlBase = this.dataService.baseUrl;
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.dataService.getAllPosts().subscribe(
      data => {
        this.rows = data; // Assignez directement toutes les données à 'rows'
      },
      error => console.error('Erreur lors du rechargement des données', error)
    );
  }

  confirmAndDelete(postId: number): void {
    const confirmation = confirm('Attention ! Vous allez supprimer un article');
    if (confirmation) {
      this.dataService.deletePost(postId).subscribe({
        next: (response) => {
          this.reloadData();
        },
        error: (error) => console.error('Erreur lors de la suppression de l\'article', error)
      });
    }
  }


  togglePublishStatus(post: PostDTO): void {
    const updatedPost = { ...post, isPublished: !post.isPublished };
    this.updatePostStatus(updatedPost);
  }

  toggleFeaturedStatus(post: PostDTO): void {
    const updatedPost = { ...post, isFeatured: !post.isFeatured };
    this.updatePostStatus(updatedPost);
  }

  updatePostStatus(post: PostDTO): void {
    if (post.id) {
      const formData = new FormData();
      Object.keys(post).forEach(key => {
        const value = post[key as keyof PostDTO];
        // Ajoutez une vérification ici pour vous assurer que la valeur n'est pas null
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      this.dataService.updatePost(post.id, formData).subscribe({
        next: updatedPost => {
          this.reloadData();
        },
        error: error => {
          console.error('Erreur lors de la mise à jour du post:', error);
        }
      });
    }
  }

}
