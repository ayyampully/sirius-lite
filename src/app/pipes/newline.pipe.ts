import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'newline'})
export /**
 * NewLineTransform
 */
class NewLineTransform implements PipeTransform {
    transform(icon: string) {
this.getNumber("RA")
        return "comment-icon"
    }
    getNumber(icon){
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var no = letters.indexOf(icon.charAt(0)) + letters.indexOf(icon.charAt(1));
        while(no>10){
            let nString = no.toString();
            let n1 = parseInt(nString.charAt(0)+nString.charAt(1));
            no = n1;
        }
        console.log(no)
    }
}