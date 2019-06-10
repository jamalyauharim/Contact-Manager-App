import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from "./contact.model";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ContactService {
	private contacts: Contact[] = [];
	private contactsUpdated = new Subject<Contact[]>();

	constructor(private http: HttpClient, private router: Router) {}

	getContacts() {
		this.http.get<{contacts: any}>(
			"http://localhost:3000/api/contacts"
			)
			.pipe(map((contactData) => {
				return contactData.contacts.map(contact => {
					return {
						id: contact._id,
						name: contact.name,
						lastName: contact.lastName,
						phoneNumber: contact.phoneNumber,
						address: contact.address,
						portfolio: contact.portfolio,
						creator: contact.creator
					};
				});
			}))
			.subscribe(transformedContactData => {
				this.contacts = transformedContactData;
				this.contactsUpdated.next([...this.contacts]);
		});	

	}

	getContactsUpdate() {
		return this.contactsUpdated.asObservable();
	}

	getContact(id: string) {
		return this.http.get<{_id: string, name: string, lastName: string, phoneNumber: string, address: string, portfolio: string}>(
			"http://localhost:3000/api/contacts/" + id
			);
	}

	updateContact(id: string, name: string, lastName: string, phoneNumber: string, address: string, portfolio: string) {
		const contact: Contact = { id: id ,name: name, lastName: lastName, phoneNumber: phoneNumber,  
			address: address, portfolio: portfolio };
		this.http
			.put("http://localhost:3000/api/contacts/" + id, contact)
			.subscribe(response => {
				const updateContacts = [...this.contacts];
				const oldContactIndex = updateContacts.findIndex(c => c.id === contact.id);
				updateContacts[oldContactIndex] = contact;
				this.contacts = updateContacts;
				this.contactsUpdated.next([...this.contacts]);
				this.router.navigate(['/myContacts']);
			});
	}



	addContact(name: string, lastName: string, phoneNumber: string, address: string, portfolio: string) {
		const contact: Contact = { id: null ,name: name, lastName: lastName, phoneNumber: phoneNumber, 
			address: address, portfolio: portfolio};
		this.http.post('http://localhost:3000/api/contacts', contact).subscribe((responseData) => {
			console.log(responseData);
		});
		this.contacts.push(contact);
		this.contactsUpdated.next([...this.contacts]);
		this.router.navigate(['/myContacts']);
	}

	deleteContact(contactId: string) {
		this.http.delete("http://localhost:3000/api/contacts/" + contactId)
			.subscribe(() => {
				const updatedContacts = this.contacts.filter(contact => contact.id !== contactId);
				this.contacts = updatedContacts;
				this.contactsUpdated.next([...this.contacts]);
			});
	}
}