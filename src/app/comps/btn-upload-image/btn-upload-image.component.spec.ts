import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUploadImageComponent } from './btn-upload-image.component';

describe('BtnUploadImageComponent', () => {
  let component: BtnUploadImageComponent;
  let fixture: ComponentFixture<BtnUploadImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnUploadImageComponent]
    });
    fixture = TestBed.createComponent(BtnUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
