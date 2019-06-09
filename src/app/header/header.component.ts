import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
	private authListenerSubs: Subscription;
	authenticated = false;
	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.authListenerSubs = this.authService
		.getAuthStatusListener()
		.subscribe(isAuthenticated => {
			this.authenticated = isAuthenticated;
		});
	}

	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
}
