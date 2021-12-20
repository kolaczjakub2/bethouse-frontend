import {Component, OnInit} from '@angular/core';
import {BetslipService} from "../../services/betslip.service";
import {BetslipView} from "../../model/betslip-view";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BetslipDetailsView} from "../../model/betslip-details-view";
import {BetslipPosition} from "../../model/betslip-position";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-betslip-list',
  templateUrl: './betslip-list.component.html',
  styleUrls: ['./betslip-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BetslipListComponent implements OnInit {
  dataSource: BetslipView[] = [];
  columnsToDisplay = ['status', 'dateTime', 'betslipType', 'stake', 'ratio', 'win', 'cashout', 'moreInfo'];
  expandedElement: BetslipView | null = null;
  betslipPositions: BetslipPosition[] = []

  constructor(private service: BetslipService, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.service.getBetslips(1).subscribe(
      {
        next: betslips => {
          this.dataSource = betslips
          console.log(betslips)
        },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })

  }

  onClickRow(element: BetslipView) {
    this.expandedElement = this.expandedElement === element ? null : element
    if (this.expandedElement) {
      this.service.getBetslipDetail(element.id, 1).subscribe(
        {
          next: betslipPositions => {
            this.betslipPositions = betslipPositions
            console.log(betslipPositions)
          },
          error: err => console.error('Observer got an error: ' + err),
          complete: () => console.log('Observer got a complete notification'),
        })
    }
  }
}
