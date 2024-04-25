export interface PostDTO {
  id?: number;
  title: string;
  slug: string;
  image: string[];
  video: string;
  content: string;
  userId: number;
  categoryId: number;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: Date;
  isFavorite?: boolean;
}
