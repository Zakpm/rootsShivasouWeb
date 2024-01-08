import { Component, OnInit } from '@angular/core';
import { PostDTO } from 'src/app/models/postDTO.model';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées
  rows: any[] = [];
  columns = [
    { prop: 'title', name: 'Titre' },
    { prop: 'publishedAt', name: 'Date de publication' },
    { prop: 'image', name: 'Image' },
    { prop: 'video', name: 'Video' },
    { prop: 'content', name: 'Contenu' },
    { prop: 'isPublished', name: 'Publication' },
    { prop: 'isFeatured', name: 'A la une' },
  ];
  limit = 10; // Nombre d'éléments par page
  rowCount = 0; // Nombre total de lignes
  curPage: number = 1; // Page actuelle
  pageSize: number = 10; // Nombre d'éléments par page

  constructor(private dataService: DataService) {
    this.imageUrlBase = this.dataService.baseUrl;

   }

  ngOnInit(): void {
    this.dataService.getAllPosts().subscribe(
      (data) => {
        this.rows = data;
        this.rowCount = data.length; // Définir le nombre total de lignes

      },
      (error) => {
        console.error('Erreur lors du chargement des articles', error);
      }
    );
  }

  setPage(pageInfo: { offset: number }) {
    this.curPage = pageInfo.offset + 1; // Mettre à jour la page actuelle
    this.dataService.getPostsPage(pageInfo.offset * this.pageSize, this.pageSize).subscribe(
      data => {
        this.rows = data;
        // Vous devrez peut-être aussi mettre à jour rowCount ici si votre API renvoie le nombre total de lignes
      },
      error => {
        console.error('Erreur lors du chargement des articles', error);
      }
    );
  }

  reloadData() {
    this.dataService.getAllPosts().subscribe(
      data => {
        this.rows = data;
        this.rowCount = data.length;
      },
      error => {
        console.error('Erreur lors du rechargement des données', error);
      }
    );
  }

  confirmAndDelete(postId: number): void {
    const confirmation = confirm('Attention ! Vous allez supprimer un article');
    if (confirmation) {
      this.dataService.deletePost(postId).subscribe({
        next: (response) => {
        this.reloadData();
      },
        error: (error) => {
          // Gérez les erreurs ici, par exemple, afficher un message d'erreur
        }
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
