import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export /**
 * SearchboxService
 */
class SearchboxService {
    constructor(private http:Http) {}
    
    search (term: string) {
        let url = 'http://localhost:3030/api/v1/users?query='+term;
        
        // TODO: Add error handling
        return this.http
                .get(url)
                .map((resp: Response) => {
                   let temp =  resp.json();
                   return temp.data.users;
                });
    }
    getProjectData(id, projectid){
        let url = ["http://localhost:3030/api/v1/ticket?ticketid=",id,"&projectid=",projectid].join('');
        return this.http.get(url)
            .map((resp: Response) => resp.json()); 
    }

}