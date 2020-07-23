import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IReqEpisodes, IResEpisode, IResEpisodes } from './episode.interface';
@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(protected http: HttpClient) {}

  episodes(request: IReqEpisodes, params: any): Observable<IResEpisodes> {
    const httpParams = {
      params: new HttpParams()
        .set('page', params ? params.pageIndex + 1 : 1)
        .set('name', request && request.name ? request.name : '')
        .set('episode', request && request.episode ? request.episode : ''),
    };

    return this.http.get<IResEpisodes>(
      environment.api + '/episode/',
      httpParams
    );
  }

  episode(episodeId: number): Observable<IResEpisode> {
    const url = environment.api + `/episode/${episodeId}`;
    return this.http.get<IResEpisode>(url);
  }
}
