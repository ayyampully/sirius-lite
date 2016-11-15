import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AppComponent } from './app.component';

import { OverviewComponent } from './overview/overview.component';
import { ListviewComponent } from './listview/listview.component';
import { DetailviewComponent } from './detailview/detailview.component';

import { SelectboxComponent } from './components/selectbox/selectbox.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { AddeditviewComponent } from './addeditview/addeditview.component';
import { CommentsComponent } from './components/comments/comments.component';
import { BlueprintComponent } from './components/blueprint/blueprint.component';
import { ChartboxComponent } from './components/chartbox/chartbox.component';

import { CommentDateTransform } from './pipes/commentdate.pipe';
import { NewLineTransform } from './pipes/newline.pipe';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ListviewComponent,
    DetailviewComponent,
    SelectboxComponent, AddeditviewComponent, CommentsComponent, SearchboxComponent, BlueprintComponent, ChartboxComponent,
    CommentDateTransform, NewLineTransform
  ],
  //pipes:[CommentDateTransform, NewLineTransform],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      //{path: '', redirectTo: 'projects/1/overview', pathMatch: 'full'},
      {path: 'projects/:id/overview', component: OverviewComponent},
      {path: 'projects/:id/list', component: ListviewComponent},
      {path: 'projects/:id/:ticket/details', component: DetailviewComponent},
      {path: 'details', component: OverviewComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
