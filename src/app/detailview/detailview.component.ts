import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailviewService } from './detailview.service';
import { TicketDetailsModel } from '../app.model';
import { SelectboxComponent } from '../components/selectbox/selectbox.component';
import { SearchboxComponent } from '../components/searchbox/searchbox.component';
import { AddeditviewComponent } from '../addeditview/addeditview.component'

import { ActivatedRoute, Router } from '@angular/router';
import { CommentsComponent } from '../components/comments/comments.component';

@Component({
  //moduleId: module.id,
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css'],
  providers: [DetailviewService],
  //directives: [SelectboxComponent, AddeditviewComponent, CommentsComponent, SearchboxComponent]
})
export class DetailviewComponent implements OnInit, OnDestroy {
  subParam:any;
  subService:any;
  errmsg:string;
  ticketDetails: TicketDetailsModel[];
  ticketDetailsEdited: TicketDetailsModel[];
  showEditView:boolean;

  constructor(private detailviewService:DetailviewService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getTicketId();
  }
  getTicketId(){
    this.subParam = this.route.params.subscribe(params => {
       this.getDetails(params['ticket'], params['id']);
    })
  }
  getDetails(ticketid:string, projectid:string){
    this.subService = this.detailviewService.getProjectData(ticketid, projectid)
      .subscribe(tList=> this.ticketDetails = tList, err=> this.errmsg = JSON.parse(err._body) )
  }
  afterUpdate(event){
    if(event.data) this.getTicketId();
    this.showEditView = false;
  }
  editTicket(){
    this.showEditView = true;
  }

  ngOnDestroy(){
    this.subParam.unsubscribe();
    this.subService.unsubscribe();
  }

}
