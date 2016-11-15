import { Component, OnInit, Input } from '@angular/core';
import { SearchboxService } from './searchbox.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import '../../rxjs-operators';

@Component({
 // moduleId: module.id,
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
  providers:[SearchboxService]
})
export class SearchboxComponent implements OnInit {
  showList: boolean;

  @Input() label: string;
  @Input() serviceType:string;

  searchItems: Observable<string[]>
  private searchStream = new Subject<string>();

  constructor(private searchboxService:SearchboxService) {}

  ngOnInit() {
    this.searchItems = this.searchStream
          .debounceTime(300)
          .distinctUntilChanged()
          .switchMap((term:string)=> this.searchboxService.search(term));
  }
  search (term: string) {
    this.searchStream.next(term);
  }

}
