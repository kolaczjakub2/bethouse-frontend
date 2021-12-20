import {Injectable} from '@angular/core';
import {BetslipPosition} from "../model/betslip-position";
import {BehaviorSubject, Observable} from "rxjs";
import {CreateBetslipRequest} from "../model/create-betslip-request";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BetslipView} from "../model/betslip-view";
import {BetslipDetailsView} from "../model/betslip-details-view";


@Injectable({
  providedIn: 'root'
})
export class BetslipService {

  currentBetslipPosition: BetslipPosition[] = []

  private betslipSource = new BehaviorSubject<BetslipPosition[]>([]);
  currentBetslip = this.betslipSource.asObservable();

  private commandSource = new BehaviorSubject("");
  currentCommand = this.commandSource.asObservable();


  constructor(private http: HttpClient) {
  }

  addToBetslip(betslipPosition: BetslipPosition) {
    this.currentBetslipPosition = this.currentBetslipPosition.filter(value => value.bet !== betslipPosition.bet)
    this.currentBetslipPosition.push(betslipPosition)
    this.betslipSource.next(this.currentBetslipPosition)
  }

  deleteToBetslip(betslipPosition: BetslipPosition) {
    this.currentBetslipPosition.splice(this.currentBetslipPosition.indexOf(betslipPosition))
    this.betslipSource.next(this.currentBetslipPosition)
  }

  clearCurrentBetslip() {
    this.currentBetslipPosition = []
    this.betslipSource.next(this.currentBetslipPosition)
  }

  placeBet(request: CreateBetslipRequest): Observable<any> {
    this.commandSource.next("Clean")
    return this.http.post(environment.backendUrl + "/user/1/betslip", request)
  }


  getBetslips(userId: number): Observable<BetslipView[]> {
    return this.http.get<BetslipView[]>(environment.backendUrl + `/user/${userId}/betslip`)
  }

  getBetslipDetail(betslipId: Number, userId: number): Observable<BetslipPosition[]> {
    return this.http.get<BetslipPosition[]>(environment.backendUrl + `/user/${userId}/betslip/${betslipId}`)
  }
}
