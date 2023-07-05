import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems!:any;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // (this.cartService.getUserCart(3)).subscribe((cartItems: any[]) => {
    //   this.cartItems = cartItems;
    // });
    this.cartItems=this.cartService.getUserCart();
    console.log("In cart comp, cartitems are: ", this.cartItems);
  }
}
