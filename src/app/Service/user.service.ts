import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from '../ProdService/products';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  success:boolean=false;

  username = '';
  userDetails: any = null;
  users!:any

  constructor(private http: HttpClient, _loginService:LoginService) {}

  registerUser(firstName: string, lastName: string, username: string, password: string, email: string): void {
    const name = firstName + ' ' + lastName;
    const user = {
      name,
      username,
      password,
      email,
      cart: []
    };
    let user1=JSON.stringify(user);
    this.http.post(this.apiUrl, user).subscribe(response =>{console.log(response); this.success=true;
    });
    

    
  }

  getSuccess():boolean{
    return this.success;
  }

  async getLoggedinUser(){
    
    try {
      const users = await this.http.get<any[]>('http://localhost:3000/users').toPromise();
      const foundUser = this.users.find();
      if (foundUser) {
        
        this.username = foundUser.username;
        this.userDetails = foundUser;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      return false;
    }

  }

}