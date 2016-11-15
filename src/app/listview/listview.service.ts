import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export/**
 * ListviewService
 */
class ListviewService {
    constructor(private http:Http) {
        
    }
    getTicketList(projectid){
        let url = "http://localhost:3030/api/v1/getticketslist";

        return this.http.get(url+"?projectid="+projectid)
           .map((resp:Response) => resp.json())
    }
}