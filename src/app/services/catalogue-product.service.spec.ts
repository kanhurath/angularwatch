import { TestBed } from '@angular/core/testing';

import { CatalogueProductService } from './catalogue-product.service';

describe('CatalogueProductService', () => {
  let service: CatalogueProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogueProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
