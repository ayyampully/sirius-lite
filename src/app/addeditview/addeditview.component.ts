import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDetailsModel } from '../app.model';
import { AddEditViewService } from './addeditview.service';
//import { SelectboxComponent } from '../components/selectbox/selectbox.component'


@Component({
  //moduleId: module.id,
  selector: 'app-addeditview',
  templateUrl: './addeditview.component.html',
  styleUrls: ['./addeditview.component.css'],
  providers:[AddEditViewService],
  //directives: [SelectboxComponent]
})
export class AddeditviewComponent implements OnInit {
  @Input() ticketDetails:TicketDetailsModel[];
  @Output() ticketUpdated = new EventEmitter();

  editedTicket:TicketDetailsModel[];
  constructor(private addEditViewService:AddEditViewService,  private router: Router, private route: ActivatedRoute) {}
  subParam:any;
  subService:any;

  ngOnInit() {
    let desc = this.ticketDetails['description'];
        desc = desc.replace(/<br\s*\/?>/mg,"\n");
    this.editedTicket = Object.assign({},this.ticketDetails);
    this.editedTicket['description'] = desc;
  }
  updateTicket(){
    let desc = this.editedTicket['description'];
        desc = desc.replace(/\r?\n/g, '<br />');
        let newTicket = {
          "description" : desc,
          "priority" : this.editedTicket['priority'],
          "type" : this.editedTicket['type'],
          "status" : this.editedTicket['status'],
          "title" : this.editedTicket['title'],
          "tags" : this.editedTicket['tags'],
          "subtickets" : this.editedTicket['subtickets'],
          "attachments" : this.editedTicket['attachments'],
          "watchers" : this.editedTicket['watchers'],
          "assignedto" : this.editedTicket['assignedto'],
      }
    this.subParam = this.route.params.subscribe(params => {
       this.updateTicketRequest(params['ticket'], newTicket);
    })
  }
  updateTicketRequest(ticketid, newTicket){
     this.subService = this.addEditViewService.updateTicket(ticketid, newTicket)
        .subscribe(data=>{
          this.ticketUpdated.emit(data)
        })
  }
  closeOverlay(){
    this.ticketUpdated.emit({})
  }
  ngOnDestroy(){
    if(this.subParam) this.subParam.unsubscribe();
    if(this.subService) this.subService.unsubscribe();
  }
}
