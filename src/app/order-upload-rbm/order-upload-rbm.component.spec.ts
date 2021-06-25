import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUploadRbmComponent } from './order-upload-rbm.component';

describe('OrderUploadRbmComponent', () => {
  let component: OrderUploadRbmComponent;
  let fixture: ComponentFixture<OrderUploadRbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUploadRbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUploadRbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
