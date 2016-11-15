import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export /**
 * DetailviewService
 */
class DetailviewService {
    constructor(private http:Http) {}
    
    
    getProjectData(id, projectid){
        let url = ["http://localhost:3030/api/v1/ticket?ticketid=",id,"&projectid=",projectid].join('');
        return this.http.get(url)
            .map((resp: Response) => resp.json()); 
    }

}