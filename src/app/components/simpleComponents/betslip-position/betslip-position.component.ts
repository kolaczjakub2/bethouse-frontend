import {Component, Input, OnInit} from '@angular/core';
import {BetslipPosition} from "../../../model/betslip-position";
import {BetslipService} from "../../../services/betslip.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-betslip-position',
  templateUrl: './betslip-position.component.html',
  styleUrls: ['./betslip-position.component.css']
})
export class BetslipPositionComponent implements OnInit {

  @Input() betslipPosition: BetslipPosition = new BetslipPosition();
  @Input() deleteMark: any;
  @Input() showStatus: Boolean = false;

  constructor(private service: BetslipService) {
  }

  ngOnInit(): void {
    console.log(this.betslipPosition);
  }


  deleteBetSlip(betslipPosition: BetslipPosition) {
    this.service.deleteToBetslip(betslipPosition)
  }
}
