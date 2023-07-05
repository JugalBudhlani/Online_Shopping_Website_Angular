import { Component, OnInit } from '@angular/core';
import { Watch } from '../ProdService/products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit{

  watches!: Observable<Watch[]>
  readonly watch_URL = 'http://localhost:3000/watches';

  constructor(private http: HttpClient ) {
    this.getAllWatches();
}

getAllWatches() {
  
  this.watches = this.http.get<Watch[]>(this.watch_URL);
  

}

ngOnInit(): void {
  this.getAllWatches();
  
}

}
