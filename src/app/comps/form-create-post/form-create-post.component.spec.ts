import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatePostComponent } from './form-create-post.component';

describe('FormCreatePostComponent', () => {
  let component: FormCreatePostComponent;
  let fixture: ComponentFixture<FormCreatePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreatePostComponent]
    });
    fixture = TestBed.createComponent(FormCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
