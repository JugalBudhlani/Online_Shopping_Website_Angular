// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../ProdService/products';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedIn: boolean = false;
  private userData: any;
  private loginTime!: any; // Store the login time
  private sessionTimeoutDuration: number = 30 * 60 * 1000; // Session timeout duration in milliseconds (30 minutes)
  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient,  private routeObj:Router) { }

  public async login(username: string, password: string): Promise<boolean> {
    const url = 'http://localhost:3000/users';
    const queryParams = `?username=${username}&password=${password}`;

    return  this.http.get<any[]>(url + queryParams)
      .toPromise()
      .then(users => {
        if (Array.isArray(users) && users.length > 0) {
          this.loggedIn = true;
          this.userData = this.http.get<any[]>("http://localhost:3000/users/?username="+username);
          this.loginTime = Date.now(); // Set the login time
          this.setupSessionTimeout(); // Set up session timeout;
          this.authenticated$.next(true);
          console.log("Logged In and value of bool in service: "+this.loggedIn);
          // console.log("User details:"+ this.userData);
          return true;
        } else {
          this.loggedIn = false;
          return false;
        }
      })
      .catch(error => {
        console.error('Error retrieving user data', error);
        return false;
      });
  }

  public isLoggedIn(): boolean {
    // console.log(this.loggedIn);
    return this.loggedIn;
    
  }

  public getUserData(): any {
    return this.userData;
  }

  public getStatus(){
    return this.loggedIn;
  }

  public async logout(): Promise<void> {
    this.loggedIn = false;
    this.userData = null;
    this.loginTime = null;
    this.authenticated$.next(false);
    this.routeObj.navigate(['/']);
    console.log("Logged Out and value of bool in service: "+this.loggedIn);
    console.log("User details:"+ this.userData);
  }

  private setupSessionTimeout(): void {
    setTimeout(() => {
      const elapsedTime = Date.now() - this.loginTime;
      if (elapsedTime >= this.sessionTimeoutDuration) {
        this.logout();
      }
    }, this.sessionTimeoutDuration);
  }
}