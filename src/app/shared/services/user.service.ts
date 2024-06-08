import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedUser: string = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  register({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login({email, password}: any) {
    let newLoggedUser = await signInWithEmailAndPassword(this.auth, email, password);
    this.setLoggedUser(newLoggedUser.user.email!);
  } 

  logout() {
    return signOut(this.auth);
  }

  setLoggedUser(user: string) {
    this.loggedUser = user;
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  async checkLoggedUser() {    
    if (this.auth.currentUser) 
      this.setLoggedUser(this.auth.currentUser.email!);
    else 
      this.router.navigate(['/login'])
  }

}
