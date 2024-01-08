import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitilisationFormComponent } from './reinitilisation-form.component';

describe('ReinitilisationFormComponent', () => {
  let component: ReinitilisationFormComponent;
  let fixture: ComponentFixture<ReinitilisationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReinitilisationFormComponent]
    });
    fixture = TestBed.createComponent(ReinitilisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
