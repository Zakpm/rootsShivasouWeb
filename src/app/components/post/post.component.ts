import { Component, OnInit } from '@angular/core';
import { FavoriteDTO } from 'src/app/models/favoriteDTO.model';
import { PostDTO } from 'src/app/models/postDTO.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataService } from 'src/app/services/data.service';
import { FavoriteService } from 'src/app/services/favorite.service';

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
  pageSize: number = 6; // Nombre de posts par page
  totalPosts: number = 0;
  totalPageCount: number = 0;
  favoriteId: number | undefined;
  favoritePostIds: number[] = [];



  constructor(private dataService: DataService, private favoriteService: FavoriteService, private authService: AuthService) {
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
    const userId = this.getUserIdFromToken();
    // Récupère les favoris de l'utilisateur actuel
    this.favoriteService.getFavoritesByUserId(userId).subscribe(favorites => {
      // Stocke l'ID du premier favori trouvé (s'il y en a un)
      if (favorites.length > 0) {
        this.favoriteId = favorites[0].id;
      }
      // Stocke localement les IDs des posts favorisés par l'utilisateur
      this.favoritePostIds = favorites.map(favorite => favorite.postId);
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

   // Vérifie si l'utilisateur est connecté
   isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Utilise la méthode isLoggedIn() du service AuthService
  }

  // Méthode pour vérifier si un post est favorisé par l'utilisateur
  isPostFavorited(postId: number): boolean {
    return this.favoritePostIds.includes(postId);
  }

  // Méthode pour ajouter un favori
  addFavorite(postId: number): void {
    const userId = this.getUserIdFromToken(); // Récupérer l'ID de l'utilisateur du token JWT
    const favoriteDTO: FavoriteDTO = {
      favorite: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: userId,
      postId: postId,
      post: { id: postId }, // Inclus l'objet post avec seulement l'ID
      user: { id: userId } // Inclus l'objet user avec seulement l'ID
    };

    this.favoriteService.addFavorite(favoriteDTO).subscribe((response) => {
      console.log('Favori ajouté avec succès.');

      // Mettre à jour localement les données pour refléter l'ajout du favori
      this.favoritePostIds.push(postId);

      // Mettre à jour la valeur de favoriteId avec l'ID du favori ajouté
      this.favoriteId = response.id;
    }, error => {
      console.error('Erreur lors de l\'ajout du favori:', error);
    });
  }

  deleteFavorite(favoriteId: number | undefined, postId: number | undefined): void {
    console.log('favoriteId:', favoriteId);
    console.log('postId:', postId);
    // Vérifie que favoriteId et postId ne sont pas undefined avant de les utiliser
    if (favoriteId !== undefined && postId !== undefined) {
      // Récupère l'ID de l'utilisateur du JWT
      const userId = this.getUserIdFromToken();

      // Crée l'objet FavoriteDTO avec les informations requises
      const favoriteDTO: FavoriteDTO = {
        favorite: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userId,
        postId: postId, // Utilisé pour l'affichage, si nécessaire
        post: { id: postId }, // Inclus l'objet post avec seulement l'ID
        user: { id: userId } // Inclus l'objet user avec seulement l'ID
      };

      // Envoie la requête DELETE pour supprimer le favori
    this.favoriteService.deleteFavorite(favoriteId, favoriteDTO).subscribe(() => {
      console.log('Favori supprimé avec succès.');

      // Supprimer l'ID du favori de favoriteId si c'est le même que celui qui vient d'être supprimé
      if (this.favoriteId === favoriteId) {
        this.favoriteId = undefined;
      }

      // Mettre à jour localement les données pour refléter la suppression du favori
      const index = this.favoritePostIds.indexOf(postId);
      if (index !== -1) {
        this.favoritePostIds.splice(index, 1);
      }
    }, error => {
      console.error('Erreur lors de la suppression du favori:', error);
    });
  } else {
    console.error('Impossible de supprimer le favori : favoriteId ou postId est undefined.');
  }

  }



  // Méthode pour récupérer l'ID de l'utilisateur à partir du token JWT
  getUserIdFromToken(): number {
    const userInfo = this.authService.getUserInfo(); // Utilise le service AuthService pour obtenir les infos de l'utilisateur
    return userInfo ? userInfo.id : 0; // Retourne 0 comme valeur par défaut si userInfo est null
  }

  toggleFavorite(postId: number | undefined): void {
    if (postId !== undefined) {
      if (this.isPostFavorited(postId)) {
        const favoriteId = this.favoriteId;
        this.deleteFavorite(favoriteId, postId);
        alert('l\'article a été supprimé de vos favoris');
      } else {
        this.addFavorite(postId);
        alert('l\'article a été ajouté à vos favoris');
      }
    } else {
      console.error('Impossible de basculer le favori : postId est undefined.');
    }
  }

}
