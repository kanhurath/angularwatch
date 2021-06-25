import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularsouploadComponent } from './angularsoupload.component';

describe('AngularsouploadComponent', () => {
  let component: AngularsouploadComponent;
  let fixture: ComponentFixture<AngularsouploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularsouploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularsouploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
