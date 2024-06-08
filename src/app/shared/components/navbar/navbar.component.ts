import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  signOut() {
    this.userService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.error('Error signing out:', error));
  }
}
