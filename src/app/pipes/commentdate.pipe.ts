import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'commentdate'})
export /**
 * CommentDateTransform
 */
class CommentDateTransform implements PipeTransform {
    transform(date: any) {
        let dateNow = new Date().getTime();
        let commentDate = new Date(date).getTime();
        let diff = (dateNow-commentDate)/1000 // to seconds
        let diffdays = Math.round(diff/(60*60*24));
        if(diff<30){
            return "Few seconds ago";
        } else if(diff<180){ // 3 minutes 3*60
            return "Few minutes ago";
        } else if(diff<3600){ // 1 hour 60*60
            let min = Math.ceil(diff/60);
            return min+" minutes ago";
        }else if(diffdays==0){ // 24 hour 24*60*60
            let min = Math.ceil(diff/(60*60));
            return min+" hours ago";
        }else if(diffdays<15){
            return diffdays+" days ago";
        }else{
            let tempDate = new Date(date);
            let dateString = tempDate.getMonth()+'/'+ tempDate.getDate()+'/'+tempDate.getFullYear();
            return dateString;
        }
        
    }
}