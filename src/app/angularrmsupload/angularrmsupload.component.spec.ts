import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularrmsuploadComponent } from './angularrmsupload.component';

describe('AngularrmsuploadComponent', () => {
  let component: AngularrmsuploadComponent;
  let fixture: ComponentFixture<AngularrmsuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularrmsuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularrmsuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
