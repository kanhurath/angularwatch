import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentAbmReportsComponent } from './indent-abm-reports.component';

describe('IndentAbmReportsComponent', () => {
  let component: IndentAbmReportsComponent;
  let fixture: ComponentFixture<IndentAbmReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentAbmReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentAbmReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
