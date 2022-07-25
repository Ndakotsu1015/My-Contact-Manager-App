import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public filteredContacts: IContact[] = [];
  public errorMessage: string | null = null;
  filterText: string = '';


  constructor(private contactService: ContactService) { 

  }

  
  ngOnInit(): void {
    this.getAllContactsFromServer();
  }
  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe( ( data ) => {

      console.log("Response:");
      console.log(data);
      this.contacts = data;
      this.filteredContacts = data;

      this.loading = false;
    }, (error) => {

      this.errorMessage = error;
      this.loading = false;

    });
  }

  public clickDeleteContact(contactId: string | undefined)
  {
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe((data:{}) => {
        this.getAllContactsFromServer();

      }, (error) => {
        this.errorMessage =error;
      });
    }
  }

  search() {
    if (this.filterText.trim().length > 0) {
      this.filteredContacts = this.contacts.filter(contact => {
        return contact.email.toLowerCase() === this.filterText.toLowerCase();
      });
      return;
    }
    this.filteredContacts = this.contacts;
  }

}
