import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentDetailsReportComponent } from './indent-details-report.component';

describe('IndentDetailsReportComponent', () => {
  let component: IndentDetailsReportComponent;
  let fixture: ComponentFixture<IndentDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
