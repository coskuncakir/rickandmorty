import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IReqEpisodes } from './episode.interface';
@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(protected http: HttpClient) {}

  episodes(request: IReqEpisodes, params: any): Observable<any> {
    const httpParams = {
      params: new HttpParams()
        .set('page', params ? params.pageIndex + 1 : 1)
        .set('name', request && request.name ? request.name : '')
        .set('episode', request && request.episode ? request.episode : ''),
    };

    return this.http.get(environment.api + '/episode/', httpParams);
  }
}
