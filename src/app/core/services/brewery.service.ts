import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  constructor(private httpClient: HttpClient) {}

  public get(): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/brewery`);
  }
}
