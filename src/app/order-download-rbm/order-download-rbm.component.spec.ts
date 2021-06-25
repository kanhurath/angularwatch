import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDownloadRbmComponent } from './order-download-rbm.component';

describe('OrderDownloadRbmComponent', () => {
  let component: OrderDownloadRbmComponent;
  let fixture: ComponentFixture<OrderDownloadRbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDownloadRbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDownloadRbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
