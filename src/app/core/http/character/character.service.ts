import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IReqCharacters } from './character.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(protected http: HttpClient) {}

  characters(request: IReqCharacters, params: any): Observable<any> {
    const httpParams = {
      params: new HttpParams()
        .set('page', params ? params.pageIndex + 1 : 1)
        .set('name', request && request.name ? request.name : '')
        .set('status', request && request.status ? request.status : '')
        .set('species', request && request.species ? request.species : '')
        .set('type', request && request.type ? request.type : '')
        .set('gender', request && request.gender ? request.gender : ''),
    };

    return this.http.get(environment.api + '/character/', httpParams);
  }
}
