import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryLevelReportComponent } from './summary-level-report.component';

describe('SummaryLevelReportComponent', () => {
  let component: SummaryLevelReportComponent;
  let fixture: ComponentFixture<SummaryLevelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryLevelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryLevelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
