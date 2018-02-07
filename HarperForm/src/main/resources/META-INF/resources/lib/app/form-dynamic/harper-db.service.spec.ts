import { TestBed, inject } from '@angular/core/testing';

import { HarperDbService } from './service/harper-db.service';

describe('HarperDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HarperDbService]
    });
  });

  it('should be created', inject([HarperDbService], (service: HarperDbService) => {
    expect(service).toBeTruthy();
  }));
});
