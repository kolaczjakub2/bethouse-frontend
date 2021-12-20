import {Component, OnInit} from '@angular/core';
import {MatchService} from "../../services/match.service";
import {Match} from "../../model/match";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matches: Match[] = [];

  constructor(private matchService: MatchService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(value => {
      this.matchService.getMatchList(value,0,10).subscribe(
        {
          next: matches => this.matches=matches,
          error: err => console.error('Observer got an error: ' + err),
          complete: () => console.log('Observer got a complete notification'),
        })

    })
  }

}
