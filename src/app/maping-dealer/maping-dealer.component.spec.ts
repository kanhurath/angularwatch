import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapingDealerComponent } from './maping-dealer.component';

describe('MapingDealerComponent', () => {
  let component: MapingDealerComponent;
  let fixture: ComponentFixture<MapingDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapingDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapingDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
