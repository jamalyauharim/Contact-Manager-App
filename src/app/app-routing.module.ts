import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./auth/login/login.component";
import { ContactListComponent } from "./contact/contact-list/contact-list.component";
import { ContactCreateComponent } from "./contact/contact-create/contact-create.component";

const routes: Routes = [
	{ path: '', component: ContactListComponent },
	{ path: 'create', component: ContactCreateComponent },
	{ path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
