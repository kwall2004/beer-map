import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenBreweryDbService {
  constructor(private httpClient: HttpClient) {}

  public get(): Observable<any> {
    return this.httpClient
      .get('https://api.openbrewerydb.org/breweries?by_state=michigan&page=1')
      .pipe(concatMap(() => this.httpClient.get('https://api.openbrewerydb.org/breweries?by_state=michigan&page=2')));
  }
}
