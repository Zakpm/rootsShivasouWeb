import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdexComponent } from './user-idex.component';

describe('UserIdexComponent', () => {
  let component: UserIdexComponent;
  let fixture: ComponentFixture<UserIdexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdexComponent]
    });
    fixture = TestBed.createComponent(UserIdexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
