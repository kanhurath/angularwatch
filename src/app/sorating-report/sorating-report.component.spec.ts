import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SORatingReportComponent } from './sorating-report.component';

describe('SORatingReportComponent', () => {
  let component: SORatingReportComponent;
  let fixture: ComponentFixture<SORatingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SORatingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SORatingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
