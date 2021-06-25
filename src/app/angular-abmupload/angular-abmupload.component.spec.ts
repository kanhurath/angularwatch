import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularAbmuploadComponent } from './angular-abmupload.component';

describe('AngularAbmuploadComponent', () => {
  let component: AngularAbmuploadComponent;
  let fixture: ComponentFixture<AngularAbmuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularAbmuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularAbmuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
