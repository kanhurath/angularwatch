import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentAbmApprovalComponent } from './indent-abm-approval.component';

describe('IndentAbmApprovalComponent', () => {
  let component: IndentAbmApprovalComponent;
  let fixture: ComponentFixture<IndentAbmApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentAbmApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentAbmApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
