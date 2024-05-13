import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OffreDeServiceComponent } from './components/offre-de-service/offre-de-service.component';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ChangeManagmentComponent } from './components/offre-de-service/change-managment/change-managment.component';
import { ArtisteCapillaireComponent } from './components/offre-de-service/artiste-capillaire/artiste-capillaire.component';
import { CreationContenuComponent } from './components/offre-de-service/creation-contenu/creation-contenu.component';
import { ContactFormComponent } from './components/forms/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConnexionFomComponent } from './components/forms/connexion-fom/connexion-fom.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { InscriptionFormComponent } from './components/forms/inscription-form/inscription-form.component';
import { ShowComponent } from './components/post/show/show.component';
import { IndexComponent } from './components/admin/index/index.component';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavbarAdminComponent } from './components/navbar/navbar-admin/navbar-admin.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArticleComponent } from './components/admin/article/article.component';
import { CreateFormComponent } from './components/forms/admin/article/create-form/create-form.component';
import { CreateComponent } from './components/admin/article/create/create.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { CreateCategoryComponent } from './components/admin/category/create-category/create-category.component';
import { CategoryFormComponent } from './components/forms/admin/category/category-form/category-form.component';
import { IntercepteurInterceptor } from './intercepteur.interceptor';
import { UpdateCategoryComponent } from './components/admin/category/update-category/update-category.component';
import { UpdateComponent } from './components/admin/article/update/update.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UserAppComponent } from './user-app/user-app.component';
import { UserIdexComponent } from './components/user/user-idex/user-idex.component';
import { NavbarUserComponent } from './components/navbar/navbar-user/navbar-user.component';
import { FooterUserComponent } from './components/footer/footer-user/footer-user.component';
import { ReinitialisationComponent } from './components/connexion/reinitialisation/reinitialisation.component';
import { ResetPasswordFormComponent } from './components/forms/reset-password-form/reset-password-form.component';
import { ReinitialisationMdpComponent } from './components/connexion/reinitialisation/reinitialisation-mdp/reinitialisation-mdp.component';
import { ResetPasswordAppComponent } from './reset-password-app/reset-password-app.component';
import { AuthResetGuard } from './auth-reset.guard';
import { ReinitilisationFormComponent } from './components/forms/reinitilisation-form/reinitilisation-form.component';
import { RemoveHtmlTagsPipe } from './pipes/remove-html-tags.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UserComponent } from './components/admin/user/user.component';
import { UserFormComponent } from './components/forms/admin/user-form/user-form.component';
import { UpdateUserComponent } from './components/admin/user/update-user/update-user.component';
import { UserProfilComponent } from './components/user/user-profil/user-profil.component';
import { UserProfilUpdateComponent } from './components/user/user-profil-update/user-profil-update.component';
import { UpdateProfilComponent } from './components/forms/update-profil/update-profil.component';
import { UserPasswordUpdateComponent } from './components/user/user-password-update/user-password-update.component';
import { UpdatePasswordComponent } from './components/forms/update-password/update-password.component';
import { ContactAdminComponent } from './components/admin/contact-admin/contact-admin.component';
import { ContactIndexComponent } from './components/admin/contact-admin/contact-index/contact-index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MentionsLegalsComponent } from './components/mentions-legals/mentions-legals.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CguComponent } from './components/cgu/cgu.component';
import { CgaComponent } from './components/cga/cga.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioAdminComponent } from './components/admin/portfolio-admin/portfolio-admin.component';
import { PortfolioAdminUpdateComponent } from './components/admin/portfolio-admin/portfolio-admin-update/portfolio-admin-update.component';
import { PortfolioFormComponent } from './components/forms/portfolio-form/portfolio-form.component'; // Ajoutez cette ligne
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {FormatDatePipe} from './pipes/format-date.pipe';
import { ShareIconsModule} from 'ngx-sharebuttons/icons';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';











@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostComponent,
    FooterComponent,
    HomepageComponent,
    OffreDeServiceComponent,
    AProposComponent,
    ContactComponent,
    ConnexionComponent,
    ChangeManagmentComponent,
    ArtisteCapillaireComponent,
    CreationContenuComponent,
    ContactFormComponent,
    ConnexionFomComponent,
    InscriptionComponent,
    InscriptionFormComponent,
    ShowComponent,
    IndexComponent,
    AdminAppComponent,
    MainLayoutComponent,
    NavbarAdminComponent,
    ArticleComponent,
    CreateFormComponent,
    CreateComponent,
    CategoryComponent,
    CreateCategoryComponent,
    CategoryFormComponent,
    UpdateCategoryComponent,
    UpdateComponent,
    UserAppComponent,
    UserIdexComponent,
    NavbarUserComponent,
    FooterUserComponent,
    ReinitialisationComponent,
    ResetPasswordFormComponent,
    ReinitialisationMdpComponent,
    ResetPasswordAppComponent,
    ReinitilisationFormComponent,
    RemoveHtmlTagsPipe,
    TruncatePipe,
    PaginationComponent,
    UserComponent,
    UserFormComponent,
    UpdateUserComponent,
    UserProfilComponent,
    UserProfilUpdateComponent,
    UpdateProfilComponent,
    UserPasswordUpdateComponent,
    UpdatePasswordComponent,
    ContactAdminComponent,
    ContactIndexComponent,
    MentionsLegalsComponent,
    BreadcrumbComponent,
    CguComponent,
    CgaComponent,
    PortfolioComponent,
    PortfolioAdminComponent,
    PortfolioAdminUpdateComponent,
    PortfolioFormComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    EditorModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    NgbCarouselModule,
    PdfViewerModule,
    ShareButtonModule,
    ShareIconsModule,
    FontAwesomeModule,
    ShareModule,
    ShareButtonsModule

  ],
  providers: [
    AuthResetGuard,
    { provide: HTTP_INTERCEPTORS, useClass: IntercepteurInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
