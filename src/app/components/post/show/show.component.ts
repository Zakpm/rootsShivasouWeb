import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PostDTO } from 'src/app/models/postDTO.model';
import { DataService } from 'src/app/services/data.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  post: PostDTO | null = null;
  imageUrlBase: string; // Créez une propriété pour stocker les données récupérées
  faCoffee = faCoffee;


  constructor(private dataService: DataService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.imageUrlBase = this.dataService.baseUrl;

  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.dataService.getPostById(+postId).subscribe(data => {
        this.post = data;
      }, error => {
        console.error('Erreur lors de la récupération du post:', error);
      });
    }
  }

  getSafeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
  }

  extractVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  getCurrentUrl(): string {
    return window.location.href;
  }
}
