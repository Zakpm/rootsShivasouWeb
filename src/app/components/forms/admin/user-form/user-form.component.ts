import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: InscriptionService,
              private router: Router,
              private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      id: [null],
      roleUser: [false],
      roleAdmin: [false],
      roleSuperAdmin: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.userService.getUserById(userId).subscribe(
          (userData) => {
            this.userForm.patchValue({
              id: userData.id,
              roleUser: userData.roles.includes('ROLE_USER'),
              roleAdmin: userData.roles.includes('ROLE_ADMIN'),
              roleSuperAdmin: userData.roles.includes('ROLE_SUPER_ADMIN')
            });
          },
          (error) => {
            console.error('Erreur lors du chargement de l\'utilisateur');
          }
        );
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid && this.userForm.value.id) {
      let selectedRoles = [];

      if (this.userForm.value.roleUser) selectedRoles.push('ROLE_USER');
      if (this.userForm.value.roleAdmin) selectedRoles.push('ROLE_ADMIN');
      if (this.userForm.value.roleSuperAdmin) selectedRoles.push('ROLE_SUPER_ADMIN');

      this.userService.updateUserRoles(this.userForm.value.id, selectedRoles).subscribe(
        response => {
          alert('Role de l\'utilisateur mis à jour avec succès');
          this.userForm.reset();
          this.router.navigate(['/admin/users']);
        },
        error => {
          console.error('Erreur lors de la mise à jour du rôle de l\'utilisateur', error);
        }
      );
    } else {
      console.error('Formulaire non valide');
    }
  }

}
