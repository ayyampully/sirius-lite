import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommentService } from './comments.service';

@Component({
  //moduleId: module.id,
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],

  providers:[CommentService]
})
export class CommentsComponent implements OnInit {
  @Input() comments:any;
  constructor(private commentService:CommentService,  private router: Router, private route: ActivatedRoute) {}
  subParam:any;
  subService:any;

  ngOnInit() {

  }
  addCommentHandler(textarea){
    let comment = textarea.value;
    if(comment.length){
      comment = comment.replace(/\r?\n/g, '<br />');
      this.subParam = this.route.params.subscribe(params => {
        this.addNewComment(params['ticket'], comment, textarea);
      })
    }
  }
  addNewComment(ticketid, comment, textarea){
      this.subService = this.commentService.updateTicket(ticketid, comment)
        .subscribe(resp=>{
          if((resp.data.status==200)){
            this.comments.push(resp.data.comment);
            textarea.value="";//textarea reset after adding
          }
      })
  }
  /*
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
     this.subService = this.commentService.updateTicket(ticketid, newTicket)
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
*/
}
