import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TicketListModel } from '../app.model';
import { ListviewService } from './listview.service'
import { BlueprintComponent } from '../components/blueprint/blueprint.component'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //moduleId: module.id,
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
  providers: [ListviewService],
  //directives: [BlueprintComponent]
})
export class ListviewComponent implements OnInit, OnDestroy {
  subParam:any;
  subService:any;

  ticketList:TicketListModel[];
  constructor(private listviewService: ListviewService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    //todo - create add view
    this.subParam = this.route.params.subscribe(params => {
       this.getDetails(params['id']);
    })
  }
  getDetails(id:string){
    this.subService = this.listviewService.getTicketList(id)
      .subscribe(tList=> this.ticketList = tList)
  }
  gotoDetails(ticketid){
    let projectid = this.ticketList['projectid'];
    this.router.navigate(['/projects/'+projectid+'/'+ticketid+'/details'], { relativeTo: this.route });
  }
  ngOnDestroy(){
    this.subParam.unsubscribe();
    this.subService.unsubscribe();
  }
}
