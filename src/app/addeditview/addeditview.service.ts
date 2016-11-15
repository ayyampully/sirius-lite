import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export /**
 * AddEditViewService
 */
class AddEditViewService {
    constructor(private http:Http) {}
    
    
    updateTicket(ticketid, ticket){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let json = JSON.stringify({"ticket":ticket});
        let url = ["http://localhost:3030/api/v1/ticket?ticketid=",ticketid].join('');
        return this.http.put(url, json, options)
            .map((resp: Response) => resp.json()); 
    }

}