import {Component, Input, OnInit} from '@angular/core';
import {Status} from "../../../model/status";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  iconName: String = 'help_outline';
  @Input() show : Boolean | null = null;
  @Input() set status(value: Status) {
    if (Status.WIN === value) {
      this.iconName = 'check_circle'
    } else if (Status.LOSE === value) {
      this.iconName = 'cancel'
    } else {
      this.iconName = 'help_outline';
    }

    console.log(this.iconName)
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
