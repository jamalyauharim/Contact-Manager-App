import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
	selector: 'app-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {
	
	contacts: Contact[] = [];
	private contactsSub: Subscription;

	constructor(public contactsService: ContactService) {}

	ngOnInit() {
		this.contactsService.getContacts();
		this.contactsSub = this.contactsService.getContactsUpdate().subscribe((contacts: Contact[]) => {
				this.contacts = contacts;
			});
	}

	ngOnDestroy() {
		this.contactsSub.unsubscribe();
	}

	onDelete(contactId: string) {
		this.contactsService.deleteContact(contactId);
	}
}