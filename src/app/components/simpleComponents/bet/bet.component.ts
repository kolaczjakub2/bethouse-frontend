import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match} from "../../../model/match";
import {Bet} from "../../../model/bet";
import {Odd} from "../../../model/odd";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  @Input() bet: Bet = new Bet();
  @Output() messageEvent = new EventEmitter<Odd>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange($event: Odd) {
    this.messageEvent.emit($event)
  }

}
