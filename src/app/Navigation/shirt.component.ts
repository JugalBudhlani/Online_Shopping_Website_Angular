import { Component,OnInit, ViewChild } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shirt } from '../ProdService/products';
import { GridComponent, RowInfo } from '@syncfusion/ej2-angular-grids';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-shirt',
  templateUrl: './shirt.component.html',
  styleUrls: ['./shirt.component.css']

})
export class ShirtComponent implements OnInit{
  shirts!: Observable<Shirt[]>
  readonly shirt_URL = 'http://localhost:3000/shirts';
  show: boolean = false;
  show1: boolean = false;
  showform=false;
  updateShirtData: Shirt[] = [];
  addShirtData: Shirt[] = [];
  public pageSettings!: Object;
  @ViewChild('grid') public grid!: GridComponent;
  selectedRecords!:RowInfo;
  showshirt:boolean=false;
  selectedShirt!:any;
 
  
  constructor(private http: HttpClient , private cartService:CartService) {
      this.getAllShirts();
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(3, productId, 'shirts').subscribe(() => {
      console.log('Item added to cart');
    });
  }

  getAllShirts() {
    this.show = true;
    this.shirts = this.http.get<Shirt[]>(this.shirt_URL);
    console.log(this.shirts);
  
  }

  ngOnInit(): void {
    this.getAllShirts();
    this.pageSettings = { pageSizes: true, pageSize: 10 };
  
  }

  
 
  EditShirt(sh: any) {
    this.show1 = true;
    this.updateShirtData.push(sh);
    this.updateShirtData = this.updateShirtData.filter(item => item.id == sh.id)
    // console.log(this.updateBookData);
  }


//Updating Books
  updateShirt(newshirt: any) {
    this.updateShirtData = [];
    // console.log(newbook);
    this.http.put(`${this.shirt_URL}/${newshirt.id}`, newshirt).subscribe(
      res => {
        console.log(res);
      });
    this.getAllShirts();
  }
//Deleting data 
  deleteShirt(sid: any) {
    this.http.delete(`${this.shirt_URL}/${sid}`).subscribe((data:any)=>
    { this.shirts=this.shirts.pipe(filter(data => data != sid))    })
  }

  deleteShirt1():void{
    const selectedRow:number=this.grid.getSelectedRowIndexes()[0];
    if (this.grid.getSelectedRowIndexes().length) {
      (this.grid.dataSource as object[]).splice(selectedRow, 1);
  }
  console.log(this.grid.getSelectedRecords);
  this.grid.refresh();
  }

  goForm()
  {   this.showform=true;   }


  addShirt(shirt:any)
  {
    this.http.post(this.shirt_URL,shirt).subscribe(
      res => {  console.log(res);       });
    this.getAllShirts();
    this.showform=false;
  }

  getSelectedShirt(args:any):void {
    this.showshirt=true;
    this.selectedRecords=this.grid.getRowInfo(args.target);
    
    this.selectedShirt=this.selectedRecords.rowData;
    console.log(this.selectedShirt);
    
    
  }
  
  


}
