import { Component, OnInit, Input } from '@angular/core';
//import  _ from 'lodash'
@Component({
  //moduleId: module.id,
  selector: 'app-blueprint',
  templateUrl: './blueprint.component.html',
  styleUrls: ['./blueprint.component.css']
})
export class BlueprintComponent implements OnInit {
  @Input() tickets;
  ticketsGrouped: Array<Object>;
  constructor() {}

  ngOnInit() {
    let col = [], tickets=this.tickets, count = 0,
      newArray = [];
    for(let i=1, len=tickets.length; i<=len; i++){
      var item = tickets[i-1];
      if(!item.assignedto) item.status = 'unassigned';
      col.push(item)
      if(i%8==0 || len==i){
        newArray.push(col);
        count++;
        col = []
      }

    }
    this.ticketsGrouped = newArray;
  }

}
