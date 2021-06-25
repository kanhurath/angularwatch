import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatFeedApprovalComponent } from './rat-feed-approval.component';

describe('RatFeedApprovalComponent', () => {
  let component: RatFeedApprovalComponent;
  let fixture: ComponentFixture<RatFeedApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatFeedApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatFeedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
