import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ContactListComponent } from "./contact/contact-list/contact-list.component";
import { ContactCreateComponent } from "./contact/contact-create/contact-create.component";


const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: "myContacts", component: ContactListComponent},
	{ path: "create", component: ContactCreateComponent },
	{ path: "edit/:contactId", component: ContactCreateComponent},
	{ path: "login", component: LoginComponent },
	{ path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
