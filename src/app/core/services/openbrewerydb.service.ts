import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenBreweryDbService {
  constructor(private httpClient: HttpClient) {}

  public get(): Observable<any> {
    return concat(
      this.httpClient.get('https://api.openbrewerydb.org/breweries?by_state=michigan&page=1'),
      this.httpClient.get('https://api.openbrewerydb.org/breweries?by_state=michigan&page=2')
    );
  }
}
