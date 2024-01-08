import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionFomComponent } from './connexion-fom.component';

describe('ConnexionFomComponent', () => {
  let component: ConnexionFomComponent;
  let fixture: ComponentFixture<ConnexionFomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnexionFomComponent]
    });
    fixture = TestBed.createComponent(ConnexionFomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
