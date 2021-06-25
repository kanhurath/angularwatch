import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMRSReportDetailsComponent } from './rmrsreport-details.component';

describe('RMRSReportDetailsComponent', () => {
  let component: RMRSReportDetailsComponent;
  let fixture: ComponentFixture<RMRSReportDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMRSReportDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMRSReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
