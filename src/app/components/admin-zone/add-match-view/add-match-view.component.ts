import {Component, OnInit} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SportService} from "../../../services/sport.service";
import {League} from "../../../model/league";
import {Team} from "../../../model/team";

@Component({
  selector: 'app-add-match-view',
  templateUrl: './add-match-view.component.html',
  styleUrls: ['./add-match-view.component.css']
})
export class AddMatchViewComponent implements OnInit {
  sports: String[] = [];
  countries: String[] = [];
  filteredSports: Observable<String[]> | undefined;
  filteredCountries: Observable<String[]> | undefined;
  leagues: League[] = [];
  filteredLeagues: Observable<League[]> | undefined;
  filteredHomeTeams: Observable<Team[]> | undefined;
  filteredAwayTeams: Observable<Team[]> | undefined;

  matchForm: FormGroup = this.fb.group({
    sport: [{value: '', disabled: false}, Validators.required],
    country: [{value: '', disabled: true}, Validators.required],
    league: [{value: '', disabled: true}, Validators.required],
    homeTeam: [{value: '', disabled: true}, Validators.required],
    awayTeam: [{value: '', disabled: true}, Validators.required],
    dateTime: [''],

  });

  constructor(private fb: FormBuilder,
              private sportService: SportService) {
  }

  ngOnInit(): void {
    this.onChanges();

    this.getSports();
  }

  onChanges(): void {
    this.onSportChange();
    this.onCountryChange();
    this.onLeagueChange();
  }

  onLeagueChange() {
    this.matchForm.get("league")?.valueChanges.subscribe((val:League) => {
      this.matchForm.get("homeTeam")?.enable({emitEvent: false})
      this.matchForm.get("awayTeam")?.enable({emitEvent: false})
      this.filteredHomeTeams = this.matchForm.get("homeTeam")?.valueChanges.pipe(
        startWith(''),
        map(value => this._filterTeams(val.participant, value)),
      );
      this.filteredHomeTeams = this.matchForm.get("awayTeam")?.valueChanges.pipe(
        startWith(''),
        map(value => this._filterTeams(val.participant, value)),
      );
    })
  }


  private onCountryChange() {
    this.matchForm.get("country")?.valueChanges.subscribe(val => {
      this.sportService.getLeagues(this.matchForm.get("sport")?.value, val).subscribe(
        {
          next: leagues => {
            this.leagues = leagues
            this.matchForm.get("league")?.enable({emitEvent: false})
            this.filteredLeagues = this.matchForm.get("league")?.valueChanges.pipe(
              startWith(''),
              map(value => this._filterLeagues(this.leagues, value)),
            );
          },
          error: err => console.error('Observer got an error: ' + err),
          complete: () => console.log('Observer got a complete notification'),
        })
    });
  }

  private onSportChange() {
    this.matchForm.get("sport")?.valueChanges.subscribe(val => {
      this.sportService.getCountries(val).subscribe(
        {
          next: countries => {
            this.countries = countries
            this.matchForm.get("country")?.enable({emitEvent: false})
            this.matchForm.get("leagueId")?.disable({emitEvent: false})
            this.filteredCountries = this.matchForm.get("country")?.valueChanges.pipe(
              startWith(''),
              map(value => this._filter(this.countries, value)),
            );
          },
          error: err => console.error('Observer got an error: ' + err),
          complete: () => console.log('Observer got a complete notification'),
        })
    });
  }

  private getSports() {
    this.sportService.getSports().subscribe(
      {
        next: sports => {
          this.sports = sports
          this.filteredSports = this.matchForm.get("sport")?.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(this.sports, value)),
          );
        },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })
  }

  private _filter(iterable: String[], value: string): String[] {
    const filterValue = value.toLowerCase();

    return iterable.filter(sport => sport.toLowerCase().includes(filterValue));
  }

  private _filterLeagues(leagues: League[], value: League | String): League[] {
    // @ts-ignore
    const filterValue = value.name !== undefined ? value.name.toLowerCase() : value.toLowerCase();
    return leagues.filter(league => league.name.toLowerCase().includes(filterValue));
  }

  private _filterTeams(participants: Team[], value: any): any {
    // @ts-ignore
    const filterValue = value.name !== undefined ? value.name.toLowerCase() : value.toLowerCase();
    return participants.filter(participant => participant.name.toLowerCase().includes(filterValue) &&
      !this.matchForm.get("homeTeam")?.value.name && !this.matchForm.get("awayTeam")?.value.name);
  }


  public displayLeague(league: League): string {
    return league.name;
  }
  public displayTeam(team: Team): string {
    return team.name;
  }
}
