import {Bet} from "./bet";

export class Match {
  homeTeam: String= '';
  awayTeam: String= '';
  dateTime: Date= new Date();
  leagueName: String= '';
  countryLeague: String = '';
  bets: Bet[] = [];
}
