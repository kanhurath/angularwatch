import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionLfeedbackComponent } from './collection-lfeedback.component';

describe('CollectionLfeedbackComponent', () => {
  let component: CollectionLfeedbackComponent;
  let fixture: ComponentFixture<CollectionLfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionLfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionLfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
