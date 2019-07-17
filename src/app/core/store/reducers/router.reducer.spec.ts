import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';

import { CustomSerializer } from './router.reducer';

describe('router reducer', () => {
  let injector: TestBed;
  let serializer: CustomSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomSerializer]
    });

    injector = getTestBed();
    serializer = injector.get(CustomSerializer);
  });

  it('is created', () => {
    expect(serializer).toBeTruthy();
  });

  it('handles serialize', () => {
    expect(serializer.serialize({ root: { firstChild: {} } } as RouterStateSnapshot)).toEqual({
      url: undefined,
      queryParams: undefined,
      params: undefined,
      fragment: undefined,
      data: undefined
    });
  });
});
