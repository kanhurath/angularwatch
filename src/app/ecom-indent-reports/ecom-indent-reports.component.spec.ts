import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECOMIndentReportsComponent } from './ecom-indent-reports.component';

describe('ECOMIndentReportsComponent', () => {
  let component: ECOMIndentReportsComponent;
  let fixture: ComponentFixture<ECOMIndentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ECOMIndentReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECOMIndentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
