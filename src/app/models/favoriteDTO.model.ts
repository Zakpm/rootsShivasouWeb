export interface FavoriteDTO {
  id?: number;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  postId: number;
  post: { id: number }; // Ajoute un objet post avec seulement l'ID
  user: { id: number }; // Ajoute un objet user avec seulement l'ID
}
