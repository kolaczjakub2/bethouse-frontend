import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MatchComponent} from "./components/simpleComponents/match/match.component";
import {SingleMatchComponent} from "./components/single-match/single-match.component";
import {BetslipListComponent} from "./components/betslip-list/betslip-list.component";
import {MatchListComponent} from "./components/bet-list/match-list.component";
import {AddMatchViewComponent} from "./components/admin-zone/add-match-view/add-match-view.component";

const routes: Routes = [
  {
    path: "match/:id",
    component: SingleMatchComponent
  },
  {
    path: "user/bets",
    component: BetslipListComponent
  },
  {
    path: "bets",
    component: MatchListComponent
  },
  {
    path: "admin",
    children: [
      {
        path:"match",
        component:AddMatchViewComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
