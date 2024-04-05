import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgaComponent } from './cga.component';

describe('CgaComponent', () => {
  let component: CgaComponent;
  let fixture: ComponentFixture<CgaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgaComponent]
    });
    fixture = TestBed.createComponent(CgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
