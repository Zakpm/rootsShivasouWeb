import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsLegalsComponent } from './mentions-legals.component';

describe('MentionsLegalsComponent', () => {
  let component: MentionsLegalsComponent;
  let fixture: ComponentFixture<MentionsLegalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentionsLegalsComponent]
    });
    fixture = TestBed.createComponent(MentionsLegalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
