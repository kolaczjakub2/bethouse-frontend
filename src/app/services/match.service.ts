import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../model/match";
import {environment} from "../../environments/environment";
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  getMatchList(value: Params, page:number, size:number): Observable<Match[]> {
    let httpParams = new HttpParams();
    Object.keys(value).forEach(function (key) {
      httpParams = httpParams.append(key, value[key]);
    });

    httpParams =httpParams.append("page", page);
    httpParams =httpParams.append("size", size);
    return this.http.get<Match[]>(environment.backendUrl + "/match", {params: httpParams});
  }

  constructor(private http: HttpClient) {
  }

  getMatch(id: number): Observable<Match> {
    return this.http.get<Match>(environment.backendUrl + "/match/" + id);
  }
}
