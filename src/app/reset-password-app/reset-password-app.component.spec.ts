import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordAppComponent } from './reset-password-app.component';

describe('ResetPasswordAppComponent', () => {
  let component: ResetPasswordAppComponent;
  let fixture: ComponentFixture<ResetPasswordAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordAppComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
