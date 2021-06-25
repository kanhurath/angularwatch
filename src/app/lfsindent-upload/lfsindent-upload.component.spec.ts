import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LFSIndentUploadComponent } from './lfsindent-upload.component';

describe('LFSIndentUploadComponent', () => {
  let component: LFSIndentUploadComponent;
  let fixture: ComponentFixture<LFSIndentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LFSIndentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LFSIndentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
