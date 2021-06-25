import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDownloadAbmComponent } from './order-download-abm.component';

describe('OrderDownloadAbmComponent', () => {
  let component: OrderDownloadAbmComponent;
  let fixture: ComponentFixture<OrderDownloadAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDownloadAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDownloadAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
