import {Component, OnInit} from '@angular/core';
import {MatchService} from "../../services/match.service";
import {Match} from "../../model/match";
import {Bet} from "../../model/bet";

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.css']
})
export class SingleMatchComponent implements OnInit {

  public match: Match = new Match();

  constructor(private matchService: MatchService) {
  }

  ngOnInit(): void {
    this.matchService.getMatch(1).subscribe(
      {
        next: match => this.match=match,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })

  }
}
