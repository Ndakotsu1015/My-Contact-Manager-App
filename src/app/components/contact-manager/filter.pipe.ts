import { Pipe, PipeTransform } from "@angular/core";
import { IContact } from "src/app/models/IContact";

@Pipe({
    name: "filterContact"
})
export class FilterPipe implements PipeTransform
{
    transform(contacts: IContact[], filterText: string ) {
        
        if(contacts.length === 0 || filterText === '')
        {
            return contacts;
        }
        else{
           return contacts.filter( (contact) => 
            {
                
                return contact.email.toLowerCase() === filterText.toLowerCase() 
            });
        }
    }
}