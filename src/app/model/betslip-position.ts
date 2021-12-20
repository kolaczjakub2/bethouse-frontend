import {Odd} from "./odd";
import {Bet} from "./bet";
import {Status} from "./status";

export class BetslipPosition {
  odd: Odd = new Odd()
  homeTeam: String = ""
  awayTeam: String = ""
  countryLeague: String = ""
  leagueName: String = ""
  dateTime: Date = new Date()
  matchId: number = 0
  bet: Bet = new Bet()
  status: Status = Status.PENDING
}
