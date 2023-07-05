import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pant, Shirt,Watch } from '../ProdService/products';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private shirtsUrl = 'http://localhost:3000/shirts'; // Replace with your API endpoint for shirts
  private pantsUrl = 'http://localhost:3000/pants'; // Replace with your API endpoint for pants
  private watchesUrl = 'http://localhost:3000/watches'; // Replace with your API endpoint for watches
  private cartUrl = 'http://localhost:3000/user';
  username="";
  cartItems: string[]=[]
  loginService!: LoginService;

  constructor(private http: HttpClient, loginService:LoginService) {

    // this.username=loginService.getU
   }

  getShirts(): Observable<Shirt[]> {
    return this.http.get<Shirt[]>(this.shirtsUrl);
  }

  getPants(): Observable<Pant[]> {
    return this.http.get<Pant[]>(this.pantsUrl);
  }

  getWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(this.watchesUrl);
  }

  addToCart(userId: number, productId: string, category: string): Observable<any> {
    const address='http://localhost:3000/users/?username=' + this.username + '&_fields=cart'
    // const url = `http://localhost:3000/users/${userId}/cart`;
    return this.http.patch(address, { productId, category });
  }

  // getLgUser():string{
  //   this.loginService
  // }

  async getUserCart(): Promise<Observable<any>> {

    // const url = `http://localhost:3000/users/${userId}`;
    const address='http://localhost:3000/users/?username=' + this.username + '&_fields=cart'
    
    let cartValues:any;
   this.http.get<any[]>(address).subscribe(response => {
      if (response.length > 0) {
        
        cartValues = response[0].cart;
        this.cartItems=cartValues;
        console.log("In cart service, cart values: "+cartValues);
        return cartValues;
         // You can access the cart values here or perform any further operations
      }
    });
    return cartValues;
  }
}