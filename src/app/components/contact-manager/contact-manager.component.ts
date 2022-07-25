import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if(contactId){
          this.contactService.deleteContact(contactId).subscribe((data:{}) => {
            this.getAllContactsFromServer();
    
          }, (error) => {
            this.errorMessage =error;
          });
        }
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    /*Swal.fire({
      title: 'Are you sure?',
      text: "Are You Sure You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })*/
    
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
