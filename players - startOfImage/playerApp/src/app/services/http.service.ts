import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly base = '/api/players';

  constructor(
    private readonly http: HttpClient,
  ) { }

  createPlayer(player: Player): Observable<Player> {
    console.log('this is the player data to be submitted to database', player);
    return this.http.post<Player>(this.base, player);
  }
}
