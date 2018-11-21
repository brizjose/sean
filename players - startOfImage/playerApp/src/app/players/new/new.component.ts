import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MessageService } from '../../services/message.service';

import { Player } from '../../models/player';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  player = new Player();

  constructor(
    private readonly httpService: HttpService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  createPlayer(event: Event, form: NgForm): void {
    console.log('new component got event and form', form.value);
    event.preventDefault();
    this.httpService.createPlayer(form.value)
      .subscribe(data => {
        console.log('back from create cycle', data);
        this.messageService.clear();
        form.reset();
      }, error => {
        console.log(error);
        this.messageService.add(error);
        // for (const each of error.error) {
        //   this.messageService.add(each);
        // }
      });

  }
  manageEvent(event: Event): void {
    event.stopPropagation();
  }

}
