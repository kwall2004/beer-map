import { TestBed } from '@angular/core/testing';

import { OpenBreweryDbService } from './openbrewerydb.service';

describe('OpenBreweryDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenBreweryDbService = TestBed.get(OpenBreweryDbService);
    expect(service).toBeTruthy();
  });
});
