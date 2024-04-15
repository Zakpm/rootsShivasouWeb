import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAdminUpdateComponent } from './portfolio-admin-update.component';

describe('PortfolioAdminUpdateComponent', () => {
  let component: PortfolioAdminUpdateComponent;
  let fixture: ComponentFixture<PortfolioAdminUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioAdminUpdateComponent]
    });
    fixture = TestBed.createComponent(PortfolioAdminUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
