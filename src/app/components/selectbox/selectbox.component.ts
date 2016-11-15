import { Component, OnInit, Input } from '@angular/core';
import { DetailviewService } from '../../detailview/detailview.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TicketDetailsModel } from '../../app.model';


@Component({
  //moduleId: module.id,
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.css'],
  providers: [ DetailviewService]
})
export class SelectboxComponent implements OnInit {

  autoClt: Array<Object>;
  showList: boolean;

  @Input() label: string;
  @Input() serviceType:string;
  @Input() editOverlay:boolean;
  searchItems: Observable<string[]>
  private searchStream = new Subject<string>();

  constructor(private detailviewService:DetailviewService) {}

  ngOnInit() {
    this.autoClt = [];
    this.showList = false;

  }

  showAutoComplete(e){
    switch(this.serviceType){
       case 'user':
      //  this.searchItems = this.searchStream
      //     .debounceTime(300)
      //     .distinctUntilChanged()
      //     .switchMap((term:string)=> this.detailviewService.search(term));
       break;

      case 'priority':
       this.autoClt = [{label:'Urgent', class:'fa fa-chevron-up urgent'},{label:'High', class:'fa fa-chevron-up'},{label:'Normal', class:'fa fa-minus'},{label:'Low', class:'fa fa-chevron-down'}]
       break;

       case 'type':
       this.autoClt = [{label:'Feature', class:'fa fa-code-fork'},{label:'Bug', class:'fa fa-flag'},{label:'Story', class:'fa fa-cube'}]
       break;
    }
    this.showList = true;
    let parentNode = (e.target.parentNode);
    this.checkClickedTarget(parentNode);
  }

  search (term: string) {
    this.searchStream.next(term);
  }

  checkClickedTarget(parentNode){

    let checkFunc = (e) => {
        //let act = document.querySelector('.autocomplete-wrap');
        if(!parentNode.contains(e.target)){
          document.removeEventListener('click', checkFunc);
          this.showList = false;
        };
      };
      document.addEventListener('click', checkFunc);
  }
  setLabel(item){}
  saveLabel(){}
}
