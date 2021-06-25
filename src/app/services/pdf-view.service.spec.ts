import { TestBed } from '@angular/core/testing';

import { PdfViewService } from './pdf-view.service';

describe('PdfViewService', () => {
  let service: PdfViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
