import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export /**
 * CommentService
 */
class CommentService {
    constructor(private http:Http) {}
    
    updateTicket(ticketid, comment){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let json = JSON.stringify({"comment":comment});
        let url = ["http://localhost:3030/api/v1/addcomment?ticketid=",ticketid].join('');
        return this.http.post(url, json, options)
            .map((resp: Response) => resp.json()); 
    }

}