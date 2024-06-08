import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../shared/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  alertTitle = 'Alert';
  alertMessage = 'Message';
  showAlert = false;
  formRegister: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formRegister = new FormGroup({
      email: new FormControl(''),
      password:  new FormControl(''), 
    });
  }

  onSubmit() {
    this.userService.register(this.formRegister.value)
      .then(response => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        if(error.message === 'Firebase: Error (auth/invalid-email).') {
          this.showAlert = true;
          this.alertTitle = 'Invalid email';
          this.alertMessage = 'Please enter a valid email address.';
        }
        if(error.message === 'Firebase: Error (auth/missing-password).') {
          this.showAlert = true;
          this.alertTitle = 'Missing password';
          this.alertMessage = 'Please enter a password.';
        }
        if(error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          this.showAlert = true;
          this.alertTitle = 'Weak password';
          this.alertMessage = 'Please enter a password with at least 6 characters.';
        }
        if(error.message === 'Firebase: Error (auth/email-already-in-use).') {
          this.showAlert = true;
          this.alertTitle = 'Email already in use';
          this.alertMessage = 'The email address is already in use by another account.';
        }
      });
  }
}
