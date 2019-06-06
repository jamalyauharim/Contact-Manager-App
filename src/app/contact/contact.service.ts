import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from "./contact.model";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ContactService {
	private contacts: Contact[] = [];
	private contactsUpdated = new Subject<Contact[]>();

	constructor(private http: HttpClient) {}

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
						portfolio: contact.portfolio
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

	addContact(name: string, lastName: string, phoneNumber: string, address: string, portfolio: string) {
		const contact: Contact = { id: null ,name: name, lastName: lastName, phoneNumber: phoneNumber, 
			address: address, portfolio: portfolio};
		this.http.post('http://localhost:3000/api/contacts', contact).subscribe((responseData) => {
			console.log(responseData);
		});
		this.contacts.push(contact);
		this.contactsUpdated.next([...this.contacts]);
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