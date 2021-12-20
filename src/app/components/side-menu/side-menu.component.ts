import {Component, OnInit} from '@angular/core';
import {SportService} from "../../services/sport.service";
import {Router} from "@angular/router";
import {League} from "../../model/league";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  sports: String[] = [];
  countries: String[] = [];
  leagues: League[] = [];

  constructor(private sportsService: SportService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.sportsService.getSports().subscribe(
      {
        next: sports => this.sports = sports,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })
  }

  onSportClick(sport: String) {
    this.sportsService.getCountries(sport).subscribe(
      {
        next: countries => this.countries = countries,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })
  }

  onCountryClick(sport: String, country: String) {
    this.sportsService.getLeagues(sport, country).subscribe(
      {
        next: leagues => this.leagues = leagues,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })
  }

  onLeagueSelect(sport: String, country: String, league: League) {
    this.router.navigate(['/bets'], {queryParams: {sport: sport, country: country, league: league.name}});
  }

}
