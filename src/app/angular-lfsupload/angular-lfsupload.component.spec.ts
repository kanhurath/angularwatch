import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLFSUploadComponent } from './angular-lfsupload.component';

describe('AngularLFSUploadComponent', () => {
  let component: AngularLFSUploadComponent;
  let fixture: ComponentFixture<AngularLFSUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularLFSUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularLFSUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
