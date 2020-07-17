import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(protected http: HttpClient) {}

  characters(): Observable<any> {
    return this.http.get<any>('api/character');
  }
}
