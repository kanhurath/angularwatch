import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMRSFileUploadComponent } from './rmrsfile-upload.component';

describe('RMRSFileUploadComponent', () => {
  let component: RMRSFileUploadComponent;
  let fixture: ComponentFixture<RMRSFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMRSFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMRSFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
