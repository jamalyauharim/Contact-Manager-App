import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Contact } from "../contact.model";

@Component({
	selector: 'app-contact-create',
	templateUrl: './contact-create.component.html',
	styleUrls: ['./contact-create.component.css']
})


export class ContactCreateComponent implements OnInit {
	contactName = '';
	contactLastName = '';
	private mode = 'create';
	private contactId: string;
	contact: Contact;

	constructor(public contactsService: ContactService, public route: ActivatedRoute) {}


	ngOnInit() {
		// paramMap is an observable which we can subscribe.
		// to listen to changes.
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			// Looks for postId because is the parameter defined in app-routing.
			if (paramMap.has('contactId')) {
				this.mode = 'edit';
				this.contactId = paramMap.get('contactId');
				this.contactsService.getContact(this.contactId)
					.subscribe(contactData => {
						this.contact = {id: contactData._id, name: contactData.name, lastName: contactData.lastName, 
							phoneNumber: contactData.phoneNumber, address: contactData.address, portfolio: contactData.portfolio};
				});
			} else {
				this.mode = 'create';
				this.contactId = null;
			}
		});
	}

	onAddContact(form: NgForm) 
	{
		if (form.invalid) {
			return;
		}
		if (this.mode === 'create') {
			this.contactsService.addContact(form.value.contactName, form.value.contactLastName, 
				form.value.contactPhoneNumber, form.value.contactAddress, form.value.contactPortfolio);
		} else {
			this.contactsService.updateContact(this.contactId, form.value.contactName, form.value.contactLastName, 
				form.value.contactPhoneNumber, form.value.contactAddress, form.value.contactPortfolio);
		}
		form.resetForm();
	}
}