import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OffreDeServiceComponent } from './components/offre-de-service/offre-de-service.component';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ChangeManagmentComponent } from './components/offre-de-service/change-managment/change-managment.component';
import { CreationContenuComponent } from './components/offre-de-service/creation-contenu/creation-contenu.component';
import { ArtisteCapillaireComponent } from './components/offre-de-service/artiste-capillaire/artiste-capillaire.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ShowComponent } from './components/post/show/show.component';
import { IndexComponent } from './components/admin/index/index.component';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ArticleComponent } from './components/admin/article/article.component';
import { CreateComponent } from './components/admin/article/create/create.component';
import { AuthGuard } from './auth.guard';
import { CategoryComponent } from './components/admin/category/category.component';
import { CreateCategoryComponent } from './components/admin/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './components/admin/category/update-category/update-category.component';
import { UpdateComponent } from './components/admin/article/update/update.component';
import { UserAppComponent } from './user-app/user-app.component';
import { UserIdexComponent } from './components/user/user-idex/user-idex.component';
import { ReinitialisationComponent } from './components/connexion/reinitialisation/reinitialisation.component';
import { ReinitialisationMdpComponent } from './components/connexion/reinitialisation/reinitialisation-mdp/reinitialisation-mdp.component';
import { ResetPasswordAppComponent } from './reset-password-app/reset-password-app.component';
import { AuthResetGuard } from './auth-reset.guard';
import { UserComponent } from './components/admin/user/user.component';
import { UpdateUserComponent } from './components/admin/user/update-user/update-user.component';
import { UserProfilComponent } from './components/user/user-profil/user-profil.component';
import { UserProfilUpdateComponent } from './components/user/user-profil-update/user-profil-update.component';
import { UserPasswordUpdateComponent } from './components/user/user-password-update/user-password-update.component';
import { ContactAdminComponent } from './components/admin/contact-admin/contact-admin.component';
import { ContactIndexComponent } from './components/admin/contact-admin/contact-index/contact-index.component';



const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // Layout principal avec navbar et footer
    children: [
      { path: 'posts', component: PostComponent },
      { path: '', component: HomepageComponent },
      { path: 'offres', component: OffreDeServiceComponent },
      { path: 'about', component: AProposComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'connexion', component: ConnexionComponent },
      { path: 'changeManagement', component: ChangeManagmentComponent },
      { path: 'contentCreator', component: CreationContenuComponent },
      { path: 'artist', component: ArtisteCapillaireComponent },
      { path: 'inscription', component: InscriptionComponent },
      { path: 'showPost/:id', component: ShowComponent },
      { path: 'reset-password/request', component: ReinitialisationComponent },
      // ... autres routes générales
    ]
  },
  {
    path: 'admin',
    component: AdminAppComponent, // Layout pour l'administration sans navbar/footer
    canActivate: [AuthGuard],
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'article/create', component: CreateComponent },
      { path: 'article/update/:id', component: UpdateComponent },
      { path: 'category/create', component: CreateCategoryComponent },
      { path: 'category/update/:id', component: UpdateCategoryComponent },
      { path: 'users', component: UserComponent },
      { path: 'user/update/:id', component: UpdateUserComponent },
      { path: 'contact', component: ContactAdminComponent },
      { path: 'contact/index/:id', component: ContactIndexComponent },
      // ... autres routes d'administration
    ]
  },
  {
    path: 'user',
    component: UserAppComponent, // Layout pour l'administration sans navbar/footer
    canActivate: [AuthGuard],
    children: [
      { path: 'index', component: UserIdexComponent },
      { path: 'profil', component: UserProfilComponent },
      { path: 'profil/modification', component: UserProfilUpdateComponent },
      { path: 'password/modification', component: UserPasswordUpdateComponent },
      // ... autres routes d'administration
    ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordAppComponent, // Layout pour l'administration sans navbar/footer
    canActivate: [AuthResetGuard],
    children: [
      { path: 'index', component: ReinitialisationMdpComponent },
      // ... autres routes d'administration
    ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
