import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeManagmentComponent } from './change-managment.component';

describe('ChangeManagmentComponent', () => {
  let component: ChangeManagmentComponent;
  let fixture: ComponentFixture<ChangeManagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeManagmentComponent]
    });
    fixture = TestBed.createComponent(ChangeManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
