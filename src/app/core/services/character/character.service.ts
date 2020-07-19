import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(protected http: HttpClient) {}

  characters(request: any, params: any): Observable<any> {
    const httpParams = {
      params: new HttpParams().set('page', params ? params.pageIndex + 1 : 1),
    };

    return this.http.get(environment.api + '/character/', httpParams);
  }
}
