import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export /**
 * OverviewService
 */
class OverviewService {
    constructor(private http:Http) {
        
    }
    getProjectData(projectId:String){
        let url = "http://localhost:3030/api/v1/getprojectdetails";
        return this.http.get(url+"?projectid="+projectId)
            .map((resp: Response) => resp.json()); 
    }
}