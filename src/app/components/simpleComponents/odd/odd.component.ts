import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Odd} from "../../../model/odd";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {Subscription} from "rxjs";
import {BetslipService} from "../../../services/betslip.service";

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit, OnDestroy {
  selected: any;
  @Input("odds") odds: Odd[] = []
  @Output() messageEvent = new EventEmitter<Odd>();
  subscription: Subscription = new Subscription();

  constructor(private service: BetslipService) {
  }

  ngOnInit(): void {
    this.subscription = this.service.currentCommand.subscribe(message => {
      if (message === 'Clean') {
        this.selected = undefined;
      }
    })
  }

  onChange($event: MatButtonToggleChange) {
    this.messageEvent.emit($event.value)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
