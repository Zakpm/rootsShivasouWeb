import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationContenuComponent } from './creation-contenu.component';

describe('CreationContenuComponent', () => {
  let component: CreationContenuComponent;
  let fixture: ComponentFixture<CreationContenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationContenuComponent]
    });
    fixture = TestBed.createComponent(CreationContenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
