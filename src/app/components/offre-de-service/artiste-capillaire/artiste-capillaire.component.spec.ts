import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisteCapillaireComponent } from './artiste-capillaire.component';

describe('ArtisteCapillaireComponent', () => {
  let component: ArtisteCapillaireComponent;
  let fixture: ComponentFixture<ArtisteCapillaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtisteCapillaireComponent]
    });
    fixture = TestBed.createComponent(ArtisteCapillaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
