import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service'

@Component({
	selector: 'app-contact-create',
	templateUrl: './contact-create.component.html',
	styleUrls: ['./contact-create.component.css']
})


export class ContactCreateComponent {
	contactName = '';
	contactLastName = '';

	constructor(public contactsService: ContactService) {}

	onAddContact(form: NgForm) 
	{
		if (form.invalid) {
			return;
		}
		this.contactsService.addContact(form.value.contactName, form.value.contactLastName, 
			form.value.contactPhoneNumber, form.value.contactAddress, form.value.contactPortfolio);
		form.resetForm();
	}
}