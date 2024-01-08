import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreDeServiceComponent } from './offre-de-service.component';

describe('OffreDeServiceComponent', () => {
  let component: OffreDeServiceComponent;
  let fixture: ComponentFixture<OffreDeServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreDeServiceComponent]
    });
    fixture = TestBed.createComponent(OffreDeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
