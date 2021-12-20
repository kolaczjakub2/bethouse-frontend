import {Component, OnDestroy, OnInit} from '@angular/core';
import {BetslipPosition} from "../../model/betslip-position";
import {Subscription} from "rxjs";
import {BetslipService} from "../../services/betslip.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit, OnDestroy {
  betslipPositions: BetslipPosition[] = [];
  subscription: Subscription = new Subscription();

  betslipForm = new FormGroup({
    stake: new FormControl(5),
    possibleWinning: new FormControl(0),
  });

  constructor(private service: BetslipService,
              private _snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription = this.service.currentBetslip.subscribe(message => {
      this.betslipPositions = message;
      this.countPossibleWin();
    })

  }

  countPossibleWin() {
    let possibleWin = 0
    if (this.betslipPositions.length > 0) {
      possibleWin = this.betslipForm.value.stake * 0.88;
      this.betslipPositions.forEach(value => possibleWin = possibleWin * +value.odd.rate)
    }
    possibleWin = Math.round(possibleWin * 100) / 100
    this.betslipForm.controls['possibleWinning'].setValue(possibleWin)
  }


  placeBet() {
    this.service.placeBet({
      stake: this.betslipForm.value.stake,
      oddsId: this.betslipPositions.map(value => value.odd.id)
    }).subscribe(
      {
        next: x => {
          this.betslipForm.reset();
          this.service.clearCurrentBetslip();
          this._snackBar.open("Bet placed successfully");
        },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      }
    );
  }
}
