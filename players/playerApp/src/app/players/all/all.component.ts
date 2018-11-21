import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

import { Player } from '../../models/player';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  players: Player[] = [];

  constructor(
    private readonly httpService: HttpService,
  ) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.httpService.getPlayers()
      .subscribe(data => {
        console.log('got this back from db:', data);
        this.players = data;
      });
  }
}
