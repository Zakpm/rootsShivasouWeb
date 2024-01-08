import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilUpdateComponent } from './user-profil-update.component';

describe('UserProfilUpdateComponent', () => {
  let component: UserProfilUpdateComponent;
  let fixture: ComponentFixture<UserProfilUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfilUpdateComponent]
    });
    fixture = TestBed.createComponent(UserProfilUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
