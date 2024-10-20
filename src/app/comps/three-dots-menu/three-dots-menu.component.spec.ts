import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDotsMenuComponent } from './three-dots-menu.component';

describe('ThreeDotsMenuComponent', () => {
  let component: ThreeDotsMenuComponent;
  let fixture: ComponentFixture<ThreeDotsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeDotsMenuComponent]
    });
    fixture = TestBed.createComponent(ThreeDotsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
