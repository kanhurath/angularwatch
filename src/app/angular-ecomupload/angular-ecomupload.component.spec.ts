import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularECOMUploadComponent } from './angular-ecomupload.component';

describe('AngularECOMUploadComponent', () => {
  let component: AngularECOMUploadComponent;
  let fixture: ComponentFixture<AngularECOMUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularECOMUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularECOMUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
