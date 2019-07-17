import { TestBed } from '@angular/core/testing';

import { BreweryEffects } from './brewery.effects';

describe('BreweryEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreweryEffects = TestBed.get(BreweryEffects);
    expect(service).toBeTruthy();
  });
});
