import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  alertTitle = 'Alert';
  alertMessage = 'Message';
  showAlert = false;
  formLogin: FormGroup;
  
  constructor(
    private userService: UserService,
    private router: Router) {
      this.formLogin = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
      });
    }
  
  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        this.router.navigate(['']);
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
        if(error.message === 'Firebase: Error (auth/invalid-credential).') {
          this.showAlert = true;
          this.alertTitle = 'Invalid credentials';
          this.alertMessage = 'Please enter a valid email address and password.';
        }
      });
  }
}
