import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUploadAbmComponent } from './order-upload-abm.component';

describe('OrderUploadAbmComponent', () => {
  let component: OrderUploadAbmComponent;
  let fixture: ComponentFixture<OrderUploadAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUploadAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUploadAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
