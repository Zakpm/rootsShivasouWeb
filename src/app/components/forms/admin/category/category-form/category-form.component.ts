import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
      this.categoryForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      slug: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      if (categoryId) {
        // Utilisez categoryId pour charger les données de la catégorie
        this.categoryService.getCategory(categoryId).subscribe(
          (categoryData) => {
            this.categoryForm.patchValue(categoryData);
          },
          (error) => {
            console.error('Erreur lors du chargement de la catégorie', error);
          }
        );
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      if (categoryData.id) {
        // Mise à jour de la catégorie
        this.categoryService.updateCategory(categoryData.id, categoryData).subscribe(
          response => {
            alert('Catégorie mise à jour avec succès');
            this.categoryForm.reset();
            this.router.navigate(['/admin/category']);
          },
          error => {
            alert('Erreur lors de la mise à jour de la catégorie');
          }
        );
      } else {
        // Création de la catégorie
        this.categoryService.insertCategory(categoryData).subscribe(
          response => {
            alert('Catégorie créée avec succès');
            this.categoryForm.reset();
            this.router.navigate(['/admin/category']);
          },
          error => {
            alert('Erreur lors de la création de la catégorie');
          }
        );
      }
    } else {
      console.error('Formulaire non valide');
    }
  }

}
