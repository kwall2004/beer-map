import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, merge, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenBreweryDbService {
  constructor(private httpClient: HttpClient) {}

  public get(): Observable<any> {
    const streams = [];

    for (let i = 1; i <= 20; i++) {
      streams.push(
        this.httpClient
          .get(`https://api.openbrewerydb.org/breweries?by_state=michigan&page=${i}`)
          .pipe(mergeMap((values: any[]) => from(values.filter(v => !!v.street))))
      );
    }

    return merge(...streams);
  }
}
