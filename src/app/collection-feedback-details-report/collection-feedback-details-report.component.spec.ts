import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFeedbackDetailsReportComponent } from './collection-feedback-details-report.component';

describe('CollectionFeedbackDetailsReportComponent', () => {
  let component: CollectionFeedbackDetailsReportComponent;
  let fixture: ComponentFixture<CollectionFeedbackDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionFeedbackDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFeedbackDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
