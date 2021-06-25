import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LFSMarchandiserReportComponent } from './lfsmarchandiser-report.component';

describe('LFSMarchandiserReportComponent', () => {
  let component: LFSMarchandiserReportComponent;
  let fixture: ComponentFixture<LFSMarchandiserReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LFSMarchandiserReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LFSMarchandiserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
