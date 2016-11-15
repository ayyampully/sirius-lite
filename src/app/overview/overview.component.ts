import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartboxComponent } from '../components/chartbox/chartbox.component';
import { OverviewService } from './overview.service'
import { ProjectModel } from '../app.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //moduleId: module.id,
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  //directives: [ChartboxComponent],
  providers: [OverviewService]
})
export class OverviewComponent implements OnInit, OnDestroy {
  subParam:any;
  subService:any;
  projectData:ProjectModel[];
  constructor(private overviewService:OverviewService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
   // this.projectData = [];
   this.subParam = this.route.params.subscribe(params => {
      this.getProjectData(params['id']);
   })

  }
  getProjectData(id:string){
    this.subService = this.overviewService.getProjectData(id).subscribe(pdata => {
      this.projectData = pdata;
    })
  }

  ngOnDestroy(){
    this.subParam.unsubscribe();
    this.subService.unsubscribe();
  }
}
