import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAreaComponent } from './login-area.component';

describe('LoginAreaComponent', () => {
  let component: LoginAreaComponent;
  let fixture: ComponentFixture<LoginAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAreaComponent]
    });
    fixture = TestBed.createComponent(LoginAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
