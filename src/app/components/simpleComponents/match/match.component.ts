import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../model/match";
import {Bet} from "../../../model/bet";
import {Odd} from "../../../model/odd";
import {BetslipService} from "../../../services/betslip.service";
import {ActivatedRoute} from "@angular/router";
import {Status} from "../../../model/status";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input("match")
  public match: Match = new Match();

  public id: string | null = "";

  constructor(private service: BetslipService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  addToBetslip(odd: Odd, bet: Bet) {
    this.service.addToBetslip(
      {
        dateTime: this.match.dateTime,
        awayTeam: this.match.awayTeam,
        homeTeam: this.match.homeTeam,
        leagueName: this.match.leagueName,
        countryLeague: this.match.countryLeague,
        odd: odd,
        matchId: this.id === null ? 0 : +this.id,
        bet: bet,
        status: Status.PENDING
      }
    )
  }
}
