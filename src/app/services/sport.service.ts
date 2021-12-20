import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {League} from "../model/league";

@Injectable({
  providedIn: 'root'
})
export class SportService {


  constructor(private http: HttpClient) {
  }

  getSports(): Observable<String[]> {
    return this.http.get<String[]>(environment.backendUrl + "/sport");
  }

  getCountries(sport: String) {
    return this.http.get<String[]>(environment.backendUrl + `/sport/${sport}/countries`);
  }

  getLeagues(sport: String, country: String) {
    return this.http.get<League[]>(environment.backendUrl + `/sport/${sport}/countries/${country}`);
  }
}
