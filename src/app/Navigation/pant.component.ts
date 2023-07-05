import { Component,OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pant } from '../ProdService/products';

@Component({
  selector: 'app-pant',
  templateUrl: './pant.component.html',
  styleUrls: ['./pant.component.css']
})
export class PantComponent {

  pants!: Observable<Pant[]>
  readonly pant_URL = 'http://localhost:3000/pants';
  show: boolean = false;
  show1: boolean = false;
  showform=false;
  updatePantData: Pant[] = []
  addPantData: Pant[] = []
  
  constructor(private http: HttpClient ) {
      this.getAllPants();
  }

  
  getAllPants() {
    this.show = true;
    this.pants = this.http.get<Pant[]>(this.pant_URL);
  
  }

  ngOnInit(): void {
    this.getAllPants();
  }
 
  EditPant(pt: any) {
    this.show1 = true;
    this.updatePantData.push(pt);
    this.updatePantData = this.updatePantData.filter(item => item.id == pt.id)
    // console.log(this.updateBookData);
  }


//Updating Books
  updatePant(newpt: any) {
    this.updatePantData = [];
    // console.log(newbook);
    this.http.put(`${this.pant_URL}/${newpt.id}`, newpt).subscribe(
      res => {
        console.log(res);
      });
    this.getAllPants();
  }
//Deleting data 
  deletePant(pid: any) {
    this.http.delete(`${this.pant_URL}/${pid}`).subscribe((data:any)=>
    { this.pants=this.pants.pipe(filter(data => data != pid))    })
  }

  goForm()
  {   this.showform=true;   }


  addPant(pant:any)
  {
    this.http.post(this.pant_URL,pant).subscribe(
      res => {  console.log(res);       });
    this.getAllPants();
    this.showform=false;
  }


}
