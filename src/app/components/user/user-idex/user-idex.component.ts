import { Component, OnInit } from '@angular/core';
import { FavoriteDTO } from 'src/app/models/favoriteDTO.model';
import { PostDTO } from 'src/app/models/postDTO.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataService } from 'src/app/services/data.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-user-idex',
  templateUrl: './user-idex.component.html',
  styleUrls: ['./user-idex.component.css']
})
export class UserIdexComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  favoritePosts: PostDTO[] = [];
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées
  favoriteId: number | undefined;
  favoritePostIds: number[] = [];



  constructor (
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private dataService: DataService
  ) {
    this.imageUrlBase = this.dataService.baseUrl;
  }

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.firstName = userInfo.prenom;
      this.lastName = userInfo.nom;
    }

    // Récupérer l'ID de l'utilisateur connecté
    const userId = this.getUserIdFromToken();

    // Récupérer les favoris de l'utilisateur
    this.favoriteService.getFavoritesByUserId(userId).subscribe((favorites: FavoriteDTO[]) => {
      console.log('Réponse JSON contenant les posts favoris :', favorites);

      // Extraire les IDs des posts favorisés
      this.favoritePostIds = favorites.map(favorite => favorite.postId); // Utilisez postId au lieu de favorite.post.id

      // Stocker l'ID du premier favori (s'il existe) dans favoriteId
      if (favorites.length > 0) {
        this.favoriteId = favorites[0].id;
  }

      // Maintenant, vous pouvez utiliser ces objets Favori pour récupérer les détails des posts favorisés
      this.getFavoritePostsDetails(favorites);

    }, error => {
      console.error('Erreur lors de la récupération des favoris de l\'utilisateur:', error);
    });
  }

  getFavoritePostsDetails(favorites: FavoriteDTO[]): void {
    console.log('Favoris récupérés :', favorites); // Ajoutez ce log pour vérifier les favoris
    favorites.forEach((favorite, index) => {
      console.log(`Iteration ${index + 1}:`);
      console.log('Favorite:', favorite); // Vérifiez la valeur de l'objet favorite
      if (favorite && favorite.postId) { // Utilisez favorite.postId directement
        const postId = favorite.postId;
        console.log('Post ID:', postId); // Vérifiez l'ID du post
        this.dataService.getPostById(postId).subscribe((post: PostDTO) => {
          console.log('Réponse du service getPostById:', post); // Vérifiez la réponse du service
          if (post && post.id) {
            this.favoritePosts.push(post);
          } else {
            console.error(`Post with ID ${postId} is undefined or does not have a valid ID.`);
          }
        }, error => {
          console.error(`Erreur lors de la récupération des détails du post ${postId}:`, error);
        });
      } else {
        console.error('Favorite object is undefined or does not have a valid postId.');
      }
    });


  }





  // Méthode pour récupérer l'ID de l'utilisateur à partir du token JWT
  getUserIdFromToken(): number {
    const userInfo = this.authService.getUserInfo(); // Utilise le service AuthService pour obtenir les infos de l'utilisateur
    return userInfo ? userInfo.id : 0; // Retourne 0 comme valeur par défaut si userInfo est null
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


